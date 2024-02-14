import { configureStore } from '@reduxjs/toolkit';

import spherePhotoReducer from '../features/spherePhotos/spherePhotosSlice';
import stillPhotoReducer from '../features/stillPhotos/stillPhotoSlice';
import generalReducer from '../features/general/generalSlice';
import currentImageReducer from '../features/currentImage/currentImageSlice';
import joinReducer from '../features/join/joinSlice';
import ipReducer from '../features/ipAddress/ipSlice';

export const store = configureStore({
  reducer: {
    spherePhotos: spherePhotoReducer,
    stillPhoto: stillPhotoReducer,
    general: generalReducer,
    current: currentImageReducer,
    join: joinReducer,
    ipAddress: ipReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
