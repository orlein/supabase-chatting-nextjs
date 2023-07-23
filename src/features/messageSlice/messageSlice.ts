import { Database } from '@/common/types/database.types';
import {
  CreateMessageParams,
  ReadMessagesParams,
  createMessage,
  readMessages,
} from '@/features/messageSlice/messageApi';
import createAppAsyncThunk from '@/features/redux/createAppAsyncThunk';
import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Message = Database['public']['Tables']['messages']['Row'] & {
  isPending?: boolean;
};

type MessageState = {
  messages: Record<
    Database['public']['Tables']['channels']['Row']['id'],
    Message[]
  >;
  loading: boolean;
  error: string | null;
};

const initialMessageState: MessageState = {
  messages: {},
  loading: false,
  error: null,
};

export const asyncReadMessagesThunk = createAppAsyncThunk(
  'message/asyncReadMessagesThunk',
  async (params: ReadMessagesParams) => {
    const messages = await readMessages(params);
    return { channel_id: params.channel_id, messages };
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

    const lastMessage = thunkAPI
      .getState()
      .message.messages[params.channel_id].reduce(
        (acc, message) => {
          if (message.id > acc.id) {
            return message;
          }
          return acc;
        },
        { id: -1 }
      );

    const newMessage = {
      id: lastMessage.id + 1,
      channel_id: params.channel_id,
      message: params.message,
      inserted_at: new Date().toISOString(),
      user_id,
      isPending: true,
    };
    thunkAPI.dispatch(
      messageSlice.actions.createMessageAction({
        channel_id: params.channel_id,
        message: newMessage,
      })
    );
    await createMessage({
      ...params,
      user_id,
    });
    return { channel_id: params.channel_id, message: newMessage };
  }
);

const messageSlice = createSlice({
  name: 'message',
  initialState: initialMessageState,
  reducers: {
    setMessagesAction: (
      state,
      action: PayloadAction<{
        channel_id: number;
        messages: Message[];
      }>
    ) => {
      state.messages[action.payload.channel_id] = action.payload.messages;
    },
    createMessageAction: (
      state,
      action: PayloadAction<{
        channel_id: number;
        message: Message;
      }>
    ) => {
      state.messages[action.payload.channel_id].push(action.payload.message);
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

      state.messages[action.payload.channel_id][messageIndex] =
        action.payload.message;
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
  },
  extraReducers: (builder) => {
    builder.addCase(asyncCreateMessageThunk.fulfilled, (state, action) => {
      const messageIndex = state.messages[action.payload.channel_id].findIndex(
        (message) => message.id === -1
      );

      if (messageIndex < 0) {
        return;
      }

      state.messages[action.payload.channel_id][messageIndex] = {
        ...action.payload.message,
        isPending: false,
      };
    });
    builder.addCase(asyncReadMessagesThunk.fulfilled, (state, action) => {
      const { channel_id, messages } = action.payload;
      state.messages[channel_id] = messages;
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
  createMessageAction,
  setMessagesAction,
  updateMessageAction,
  deleteMessageAction,
} = messageSlice.actions;

export const selectMessage = (state: RootState) => state.message;

export default messageSlice.reducer;
