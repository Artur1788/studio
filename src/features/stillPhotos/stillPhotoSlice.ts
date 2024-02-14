import { createSlice } from '@reduxjs/toolkit';

import { fetchStillPhoto } from './stillAsyncThunks';
import { Still } from './stillPhotos.types';

interface StillState {
  stillPhotos: Still[];
  isLoading: boolean;
  error: string | null;
}

const initialState: StillState = {
  stillPhotos:
    (JSON.parse(localStorage.getItem('stillPhotos') as '[]') as Still[]) || [],
  isLoading: false,
  error: null,
};

export const stillSlice = createSlice({
  name: 'still',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchStillPhoto.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStillPhoto.fulfilled, (state, action) => {
        state.isLoading = false;

        if (!state.stillPhotos.length) {
          state.stillPhotos.push(action.payload);
          localStorage.setItem(
            'stillPhotos',
            JSON.stringify(state.stillPhotos),
          );
          return;
        }

        if (state.stillPhotos.length > 9) {
          state.stillPhotos.pop();
          state.stillPhotos.unshift(action.payload);
        } else {
          state.stillPhotos.unshift(action.payload);
        }

        localStorage.setItem('stillPhotos', JSON.stringify(state.stillPhotos));

        state.error = '';
      })
      .addCase(fetchStillPhoto.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
});

export default stillSlice.reducer;
