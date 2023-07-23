import { Database } from '@/common/types/database.types';
import {
  FetchChannelsParams,
  fetchChannels,
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

export const asyncSetChannelThunk = createAppAsyncThunk(
  'channel/asyncSetChannelThunk',
  async (params?: FetchChannelsParams) => {
    const channels = await fetchChannels(params);
    return channels;
  }
);

const channelSlice = createSlice({
  name: 'channel',
  initialState: initialChannelState,
  reducers: {
    setChannels: (state, action: PayloadAction<ChannelState['channels']>) => {
      state.channels = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncSetChannelThunk.pending, (state) => {
        console.log(asyncSetChannelThunk.pending);
        state.loading = true;
      })
      .addCase(asyncSetChannelThunk.fulfilled, (state, action) => {
        console.log(asyncSetChannelThunk.fulfilled);
        state.loading = false;
        state.channels = action.payload;
      })
      .addCase(asyncSetChannelThunk.rejected, (state, action) => {
        console.log(asyncSetChannelThunk.rejected);
        state.loading = false;
        state.error =
          action.error.message ||
          'Unknown error occurred while fetching channels';
      });
  },
});

export const { setChannels } = channelSlice.actions;

export const selectChannel = (state: RootState) => state.channel;

export default channelSlice.reducer;
