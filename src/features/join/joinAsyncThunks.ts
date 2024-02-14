import { createAsyncThunk } from '@reduxjs/toolkit';

import { AxiosError } from 'axios';

import toast from 'react-hot-toast';

import axios from '../../axios';
import { Join } from './join.types';
import { FormFields } from '../../components/form/Form';

export const fetchJoinUser = createAsyncThunk<
  Join,
  FormFields,
  { rejectValue: string }
>('users/getData', async ({ name, email }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`users?name=${name}&email=${email}`);
    return response.data as Join;
  } catch (error) {
    const err = (error as AxiosError)?.response?.data as AxiosError;
    toast.error(err?.message);

    return rejectWithValue(err?.message);
  }
});
