import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import axios from '../../../axios';
import { Data } from '../general.types';

export const fetchRug = createAsyncThunk<
  Data,
  { page?: number; count?: number; next_page?: string },
  { rejectValue: string }
>('rug/getData', async ({ next_page }, { rejectWithValue, signal }) => {
  try {
    const response = await axios.get(
      next_page ? next_page : `rugs/random-rugs?offset=1&limit=10`,
      {
        signal,
      },
    );

    return response.data as Data;
  } catch (error) {
    const err = error as AxiosError;

    return rejectWithValue(err.message);
  }
});
