import { createSlice } from '@reduxjs/toolkit';

import { fetchSphereData } from './sphereAsyncThunks';
import { Sphere } from './spherePhotos.types';

interface SphereState {
  spherePhotos: Sphere[];
  isLoading: boolean;
  error: string;
}

const initialState: SphereState = {
  spherePhotos: [],
  isLoading: false,
  error: '',
};

export const sphereSlice = createSlice({
  name: 'sphere',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchSphereData.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchSphereData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.spherePhotos = action.payload;
        state.error = '';
      })
      .addCase(fetchSphereData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});

export default sphereSlice.reducer;
