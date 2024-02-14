import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import axios from '../../../axios';
import { Tab } from '../general.types';

export const fetchTab = createAsyncThunk<Tab[], void, { rejectValue: string }>(
  'category/getData',
  async (_, { rejectWithValue, signal }) => {
    try {
      const response = await axios.get('categories', {
        signal,
      });

      return response.data as Tab[];
    } catch (error) {
      const err = error as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
