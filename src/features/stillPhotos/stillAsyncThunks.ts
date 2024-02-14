import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import axios from '../../axios';
import { Still } from './stillPhotos.types';

export const fetchStillPhoto = createAsyncThunk<
  Still,
  FormData,
  { rejectValue: string }
>('still/getData', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post('upload-still-image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data as Still;
  } catch (error) {
    const err = error as AxiosError;

    toast.error(err.message);
    return rejectWithValue(err.message);
  }
});
