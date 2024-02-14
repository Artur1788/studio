import { createSlice } from '@reduxjs/toolkit';

import { Join } from './join.types';
import { fetchJoinUser } from './joinAsyncThunks';

interface JoinState {
  userJoin: Join;
  isConfirm: boolean;
  isLoading: boolean;
  error: string;
}

const initialState: JoinState = {
  userJoin: {} as Join,
  isConfirm: false,
  isLoading: false,
  error: '',
};

export const joinUser = createSlice({
  name: 'join',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchJoinUser.pending, state => {
        state.isLoading = true;
        state.isConfirm = true;
      })
      .addCase(fetchJoinUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userJoin = action.payload;
        state.isConfirm = false;
        state.error = '';
      })
      .addCase(fetchJoinUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});

export default joinUser.reducer;
