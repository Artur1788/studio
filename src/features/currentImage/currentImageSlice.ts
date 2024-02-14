import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  CurrentImage,
  DataFromUrl,
  Loading,
  LookResult,
} from './currentImage.types';
import { fetchCurrentImage } from './getCurrentImageThunk';

interface CurrentImageState {
  currentImageInfo: CurrentImage;
  isLoading: Loading;
  error: string | null;
}

const initialState: CurrentImageState = {
  currentImageInfo: {
    isSphere:
      (JSON.parse(sessionStorage.getItem('isSphere') as string) as boolean) ??
      true,
    originalPhotoName:
      (JSON.parse(
        sessionStorage.getItem('originalPhotoName') as string,
      ) as string) || 'demo_sample_10',
    timeRemaining: 0,
    before:
      (JSON.parse(sessionStorage.getItem('before') as string) as string) ||
      'https://public.stagnyc.com/hardcoded_spheres/demo_sample_10.jpg',
    after: '',
    lookResult: {} as LookResult,
    processId: null,
  },
  isLoading: null,
  error: null,
};

export const currentImageSlice = createSlice({
  name: 'currentImage',
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.currentImageInfo.timeRemaining = action.payload;
    },
    setCurrentLookInfo: (state, action: PayloadAction<LookResult>) => {
      state.currentImageInfo.lookResult = action.payload;
    },
    setPhotoName: (state, action: PayloadAction<string>) => {
      state.currentImageInfo.originalPhotoName = action.payload;
    },
    setIsSphere(state, action: PayloadAction<boolean>) {
      state.currentImageInfo.isSphere = action.payload;
    },
    setOriginalPhotoName(state, action: PayloadAction<string>) {
      state.currentImageInfo.originalPhotoName = action.payload;
    },
    setBeforeImage(state, action: PayloadAction<string>) {
      state.currentImageInfo.before = action.payload;
    },
    resetAfterImage(state, action: PayloadAction<string>) {
      state.currentImageInfo.after = action.payload;
    },
    setIsLoading(state, action: PayloadAction<Loading>) {
      state.isLoading = action.payload;
    },
    setCurrentProcessId(state, action: PayloadAction<number>) {
      state.currentImageInfo.processId = action.payload;
    },
    setDataFromUrl(state, action: PayloadAction<DataFromUrl>) {
      if (action.payload.isSphere) {
        state.currentImageInfo.isSphere =
          action.payload.isSphere === 'true' ? true : false;
      }
      if (state.currentImageInfo.originalPhotoName) {
        state.currentImageInfo.originalPhotoName =
          action.payload.originalPhotoName;
      }
      if (state.currentImageInfo.before) {
        state.currentImageInfo.before = action.payload.before;
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrentImage.pending, state => {
        state.isLoading = 'connecting';
        state.error = null;
      })
      .addCase(fetchCurrentImage.fulfilled, (state, action) => {
        state.isLoading = 'finishing';
        state.currentImageInfo.after = action.payload;
      })
      .addCase(fetchCurrentImage.rejected, (state, action) => {
        state.isLoading = null;

        if (action.error.message === 'Aborted') {
          state.isLoading = 'connecting';
        }

        if (action.payload === 'queue') {
          state.error = action.payload;
        } else {
          state.error = action.error.message!;
        }
      });
  },
});

export const {
  setTime,
  setPhotoName,
  setIsSphere,
  setOriginalPhotoName,
  setBeforeImage,
  resetAfterImage,
  setIsLoading,
  setCurrentLookInfo,
  setCurrentProcessId,
  setDataFromUrl,
} = currentImageSlice.actions;

export default currentImageSlice.reducer;
