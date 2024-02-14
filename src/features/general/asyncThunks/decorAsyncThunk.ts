import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import axios from '../../../axios';
import { Data } from '../general.types';

export const fetchDecor = createAsyncThunk<
  Data,
  { decorTab?: string; page?: number; count?: number; next_page?: string },
  { rejectValue: string }
>(
  'decor/getData',
  async ({ decorTab, next_page }, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get(
        next_page
          ? next_page
          : `decors/random-decors?offset=1&limit=10&type=${decorTab}`,
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
