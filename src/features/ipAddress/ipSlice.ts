import { createSlice } from '@reduxjs/toolkit';

import { fetchIpAddress } from './ipAsyncThunk';

interface IpAddressState {
  ip?: string;
  isLoading: boolean;
  error: string;
}

const initialState: IpAddressState = {
  ip: (JSON.parse(sessionStorage.getItem('ip') as '') as string) || '',
  isLoading: false,
  error: '',
};

export const ipSlice = createSlice({
  name: 'ip',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchIpAddress.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchIpAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ip = action.payload.ip;
        sessionStorage.setItem('ip', JSON.stringify(action.payload.ip));
        state.error = '';
      })
      .addCase(fetchIpAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});

export default ipSlice.reducer;
