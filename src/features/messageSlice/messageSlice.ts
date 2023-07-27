import { Database } from '@/common/types/database.types';
import {
  CreateMessageParams,
  ReadMessagesParams,
  createMessage,
  deleteMessage,
  readMessages,
} from '@/features/messageSlice/messageApi';
import { readUser } from '@/features/messageSlice/userApi';
import createAppAsyncThunk from '@/features/redux/createAppAsyncThunk';
import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type Message = Database['public']['Tables']['messages']['Row'] & {
  isPending?: boolean;
};

export type MessageUser = Database['public']['Tables']['users']['Row'];

export type MessageWithAuthor = Message & { author: MessageUser };

export type MessageState = {
  messages: Record<
    Database['public']['Tables']['channels']['Row']['id'],
    MessageWithAuthor[]
  >;
  users: Record<
    Database['public']['Tables']['channels']['Row']['id'],
    MessageUser[]
  >;
  loading: boolean;
  error: string | null;
};

const initialMessageState: MessageState = {
  messages: {},
  users: {},
  loading: false,
  error: null,
};

export const asyncReadMessagesThunk = createAppAsyncThunk(
  'message/asyncReadMessagesThunk',
  async (params: ReadMessagesParams) => {
    const messages = await readMessages(params);

    const maybeUsers = await Promise.all(
      messages
        .reduce((acc, message) => {
          if (
            acc.findIndex(
              (accMessage) => accMessage.user_id === message.user_id
            ) > -1
          ) {
            return [...acc];
          }
          return [...acc, message];
        }, [] as Message[])
        .map((message) => readUser({ user_id: message.user_id }))
    );
    const users = maybeUsers.filter(
      (user) => typeof user !== 'undefined'
    ) as MessageUser[];
    return { channel_id: Number(params.channel_id), messages, users };
  }
);

export const asyncCreateMessageThunk = createAppAsyncThunk(
  'message/asyncCreateMessageThunk',
  async function (params: Omit<CreateMessageParams, 'user_id'>, thunkAPI) {
    const { session } = thunkAPI.getState().auth;

    if (!session?.user) {
      throw new Error('User not logged in');
    }
    const user_id = session.user.id;
    const channel_id = Number(params.channel_id);

    // const lastMessage =
    //   thunkAPI.getState().message.messages[channel_id][
    //     thunkAPI.getState().message.messages[channel_id].length - 1
    //   ];

    // const newMessage: Message = {
    //   id: Number(lastMessage.id) + 1,
    //   channel_id,
    //   message: params.message,
    //   inserted_at: new Date().toISOString(),
    //   user_id,
    //   isPending: true,
    // };
    // thunkAPI.dispatch(
    //   messageSlice.actions.createMessageAction({
    //     channel_id,
    //     message: newMessage,
    //   })
    // );
    await createMessage({
      ...params,
      user_id,
    });
    // return { channel_id, message: newMessage };
    return { channel_id };
  }
);

export const asyncDeleteMessageThunk = createAppAsyncThunk(
  'message/asyncDeleteMessageThunk',
  async (params: { message_id: number; channel_id: number }, thunkAPI) => {
    const { session } = thunkAPI.getState().auth;
    if (!session?.user) {
      throw new Error('User not logged in');
    }

    await deleteMessage({
      message_id: params.message_id,
      channel_id: params.channel_id,
    });
  }
);

export const asyncAddUserThunk = createAppAsyncThunk(
  'message/asyncAddUserThunk',
  async (params: { channel_id: number; user_id: string }, thunkAPI) => {
    const userIndex = thunkAPI
      .getState()
      .message.users[params.channel_id]?.findIndex(
        (user) => user.id === params.user_id
      );

    if (userIndex > -1) {
      return { type: 'DO_NOTHING' };
    }

    const user = await readUser({ user_id: params.user_id });

    if (!user) {
      return { type: 'DO_NOTHING' };
    }

    thunkAPI.dispatch(
      messageSlice.actions.addUserAction({
        channel_id: params.channel_id,
        user,
      })
    );

    return { type: 'DO_NOTHING' };
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState: initialMessageState,
  reducers: {
    initializeChannelAction: (
      state,
      action: PayloadAction<{
        channel_id_array: number[];
      }>
    ) => {
      action.payload.channel_id_array.forEach((channel_id) => {
        state.messages[channel_id] = [];
        state.users[channel_id] = [];
      });
    },
    createMessageAction: (
      state,
      action: PayloadAction<{
        channel_id: number;
        message: Message;
      }>
    ) => {
      const authorIndex = state.users[action.payload.channel_id].findIndex(
        (user) => user.id === action.payload.message.user_id
      );

      if (authorIndex < 0) {
        return;
      }

      state.messages[action.payload.channel_id].unshift({
        ...action.payload.message,
        author: state.users[action.payload.channel_id][authorIndex],
      });
    },
    updateMessageAction: (
      state,
      action: PayloadAction<{
        channel_id: number;
        message: Message;
      }>
    ) => {
      const messageIndex = state.messages[action.payload.channel_id].findIndex(
        (message) => message.id === action.payload.message.id
      );
      if (messageIndex < 0) {
        return;
      }

      const authorIndex = state.users[action.payload.channel_id].findIndex(
        (user) => user.id === action.payload.message.user_id
      );

      if (authorIndex < 0) {
        return;
      }

      state.messages[action.payload.channel_id][messageIndex] = {
        ...action.payload.message,
        author: state.users[action.payload.channel_id][authorIndex],
      };
    },
    deleteMessageAction: (
      state,
      action: PayloadAction<{
        channel_id: number;
        message_id: number;
      }>
    ) => {
      const messageIndex = state.messages[action.payload.channel_id].findIndex(
        (message) => message.id === action.payload.message_id
      );
      if (messageIndex < 0) {
        return;
      }

      state.messages[action.payload.channel_id].splice(messageIndex, 1);
    },
    addUserAction: (
      state,
      action: PayloadAction<{
        channel_id: number;
        user: MessageUser;
      }>
    ) => {
      const userIndex = state.users[action.payload.channel_id].findIndex(
        (user) => user.id === action.payload.user.id
      );

      if (userIndex > -1) {
        return;
      }

      state.users[action.payload.channel_id].push(action.payload.user);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(asyncCreateMessageThunk.fulfilled, (state, action) => {
    //   const messageIndex = state.messages[action.payload.channel_id].findIndex(
    //     (message) => message.id === action.payload.message.id
    //   );

    //   console.log({ messageIndex });

    //   if (messageIndex < 0) {
    //     return;
    //   }

    //   const authorIndex = state.users[action.payload.channel_id].findIndex(
    //     (user) => user.id === action.payload.message.user_id
    //   );

    //   if (authorIndex < 0) {
    //     return;
    //   }

    //   state.messages[action.payload.channel_id][messageIndex] = {
    //     ...action.payload.message,
    //     isPending: false,
    //     author: state.users[action.payload.channel_id][authorIndex],
    //   };
    // });
    builder.addCase(asyncReadMessagesThunk.fulfilled, (state, action) => {
      const { channel_id, messages, users } = action.payload;
      state.messages[channel_id] = messages.map((message) => ({
        ...message,
        author: users.find((user) => user.id === message.user_id)!,
      }));
      state.users[channel_id] = users;
    });
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/fulfilled'),
      (state) => {
        state.loading = false;
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/pending'),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      (action: PayloadAction) => action.type.endsWith('/rejected'),
      (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Unknown error occurred';
      }
    );
  },
});

export const {
  initializeChannelAction,
  createMessageAction,
  updateMessageAction,
  deleteMessageAction,
} = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message;

export default messageSlice.reducer;
