import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import toast from 'react-hot-toast';

import axios from '../../axios';
import { Ip } from './ip.types';

export const fetchIpAddress = createAsyncThunk<
  Ip,
  void,
  { rejectValue: string }
>('ip/getData', async (_, { rejectWithValue, signal }) => {
  try {
    const response = await axios.get(`https://ipapi.co/json/`, {
      signal,
    });

    return response.data as Ip;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.message);

    return rejectWithValue(err.message);
  }
});
