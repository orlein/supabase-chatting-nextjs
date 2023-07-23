import { Database } from '@/common/types/database.types';
import {
  CreateChannelParam,
  ReadChannelsParams,
  createChannel,
  readChannels,
} from '@/features/channelSlice/channelApi';
import createAppAsyncThunk from '@/features/redux/createAppAsyncThunk';
import { RootState } from '@/redux/store';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type ChannelState = {
  channels: Database['public']['Tables']['channels']['Row'][];
  loading: boolean;
  error: string | null;
};

const initialChannelState: ChannelState = {
  channels: [],
  loading: false,
  error: null,
};

export const asyncReadChannelsThunk = createAppAsyncThunk(
  'channel/asyncSetChannelThunk',
  async (params?: ReadChannelsParams) => {
    const channels = await readChannels(params);
    return channels;
  }
);

export const asyncCreateChannelThunk = createAppAsyncThunk(
  'channel/asyncAddChannelThunk',
  async (params: Pick<CreateChannelParam, 'slug'>, thunkAPI) => {
    const { session } = thunkAPI.getState().auth;
    const channel = await createChannel({
      ...params,
      created_by: session!.user!.id,
    }); // user is not null
    return channel;
  }
);

const channelSlice = createSlice({
  name: 'channel',
  initialState: initialChannelState,
  reducers: {
    setChannelsAction: (
      state,
      action: PayloadAction<ChannelState['channels']>
    ) => {
      state.channels = action.payload;
    },
    createChannelAction: (
      state,
      action: PayloadAction<ChannelState['channels'][0]>
    ) => {
      state.channels.push(action.payload);
    },
    deleteChannelAction: (
      state,
      action: PayloadAction<ChannelState['channels'][0]>
    ) => {
      state.channels = state.channels.filter(
        (channel) => channel.id !== action.payload.id
      );
    },
    updateChannelAction: (
      state,
      action: PayloadAction<ChannelState['channels'][0]>
    ) => {
      const targetChannelIndex = state.channels.findIndex(
        (channel) => channel.id === action.payload.id
      );

      if (targetChannelIndex < 0) {
        return;
      }

      state.channels[targetChannelIndex] = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncReadChannelsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.channels = action.payload;
      })
      .addMatcher(
        (action: PayloadAction) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action: PayloadAction) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Unknown error occurred';
        }
      );
  },
});

export const {
  setChannelsAction,
  createChannelAction,
  deleteChannelAction,
  updateChannelAction,
} = channelSlice.actions;

export const selectChannel = (state: RootState) => state.channel;

export default channelSlice.reducer;
