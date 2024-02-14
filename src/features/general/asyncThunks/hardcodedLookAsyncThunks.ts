import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import axios from '../../../axios';
import { HardcodedLook } from '../general.types';

export const fetchHardcodedLook = createAsyncThunk<
  HardcodedLook[],
  void,
  { rejectValue: string }
>('hardcoded/getData', async (_, { rejectWithValue, signal }) => {
  try {
    const response = await axios.get('hardcoded-looks', {
      signal,
    });

    return response.data as HardcodedLook[];
  } catch (error) {
    const err = error as AxiosError;

    return rejectWithValue(err.message);
  }
});
