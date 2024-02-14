import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import axios from '../../../axios';
import { Data } from '../general.types';

export const fetchFloor = createAsyncThunk<
  Data,
  { page?: number; count?: number; next_page?: string },
  { rejectValue: string }
>(
  'floor/getData',
  async ({ next_page }, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get(
        next_page ? next_page : `random-tiles?offset=1&limit=10`,
        {
          signal,
        },
      );
      return response.data as Data;
    } catch (error) {
      const err = error as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
