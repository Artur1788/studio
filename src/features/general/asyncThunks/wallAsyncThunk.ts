import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import axios from '../../../axios';
import { WallData } from '../general.types';

export const fetchWall = createAsyncThunk<
  WallData,
  { selectedName?: string; next_page?: string },
  { rejectValue: string }
>(
  'wall/getData',
  async (
    { selectedName, next_page },
    { rejectWithValue, signal },
  ) => {
    try {
      const response = await axios.get(
        next_page
          ? next_page
          : `colors?offset=1&limit=10&fullPath=${selectedName}`,
        {
          signal,
        },
      );

      return response.data as WallData;
    } catch (error) {
      const err = error as AxiosError;

      return rejectWithValue(err.message);
    }
  },
);
