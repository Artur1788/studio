import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import toast from 'react-hot-toast';

import { RootState } from '../../../app/store';
import axios from '../../../axios';
import { ApplicableResponse } from '../general.types';

export const fetchApplicableTab = createAsyncThunk<
  ApplicableResponse,
  void,
  {
    rejectValue: string;
    signal: AbortSignal;
    state: RootState;
  }
>('applicable/getData', async (_, { rejectWithValue, signal, getState }) => {
  const { isSphere, originalPhotoName } = getState().current.currentImageInfo;

  const params = new URLSearchParams({
    originalPhotoName: originalPhotoName,
    type: isSphere ? 'hardcodedsphere' : 'stillphoto',
  });

  try {
    const response = await axios.get(
      `applicable-categories?${params.toString()}`,
      {
        signal,
      },
    );

    return response.data as ApplicableResponse;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.message);

    return rejectWithValue(err.message);
  }
});
