import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import axios from '../../axios';
import { Sphere } from './spherePhotos.types';

export const fetchSphereData = createAsyncThunk<
  Sphere[],
  void,
  { rejectValue: string }
>('sphere/getData', async (_, { rejectWithValue, signal }) => {
  try {
    const response = await axios.get('/v2/hardcoded-spheres', {
      signal,
    });

    return response.data as Sphere[];
  } catch (error) {
    const err = error as AxiosError;
    return rejectWithValue(err.message);
  }
});
