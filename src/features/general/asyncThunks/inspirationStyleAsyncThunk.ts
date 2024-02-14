import { createAsyncThunk } from '@reduxjs/toolkit';

import axios, { AxiosError } from 'axios';

import { HardcodedLook as InspirationStyleI } from '../general.types';
import { AppDispatch } from '../../../app/store.ts';
import { getInspirationStyleResult } from '../services/inspirationStyle.service';
import {
  resetAfterImage,
  setIsLoading,
} from '../../currentImage/currentImageSlice.ts';

export interface InspirationRemainingI {
  ID: number;
  minutesRemaining: number;
  secondsRemaining: number;
}

export const uploadInspirationStyle = createAsyncThunk<
  InspirationStyleI | undefined,
  FormData,
  {
    rejectWithValue: string;
    signal: AbortSignal;
    dispatch: AppDispatch;
  }
>(
  'general/upload-new-style',
  async (formData, { rejectWithValue, signal, dispatch }) => {
    try {
      dispatch(setIsLoading('connecting'));
      dispatch(resetAfterImage(''));
      const response = await axios.post<InspirationRemainingI>(
        '/v2/uploadLookNew',
        formData,
        {
          signal,
        },
      );

      const newStyle = await getInspirationStyleResult({
        id: response.data.ID,
        signal,
        dispatch,
      });
      return newStyle;
    } catch (error) {
      const err = error as AxiosError;
      dispatch(setIsLoading(null));
      return rejectWithValue(err.message);
    }
  },
);
