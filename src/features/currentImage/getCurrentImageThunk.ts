import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import toast from 'react-hot-toast';

import { AppDispatch, RootState } from '../../app/store';
import axios from '../../axios';
import { Storage } from '../general/services/storage.service';
import { applyLookReq } from './currentImage.service';
import { NewLookResponse } from './currentImage.types';
import {
  setCurrentProcessId,
  setIsLoading,
  setTime,
} from './currentImageSlice';

export const fetchCurrentImage = createAsyncThunk<
  string,
  void,
  {
    rejectValue: string;
    signal: AbortSignal;
    state: RootState;
    dispatch: AppDispatch;
  }
>(
  'current/getData',
  async (_, { rejectWithValue, signal, getState, dispatch }) => {
    const { isSphere, originalPhotoName, before } =
      getState().current.currentImageInfo;
    const { url } = getState().general.selected.selectedLook;
    const selectedItemsData = getState().general;
    const { id: floorID } = getState().general.selected.selectedFloor;
    const { id: wallID } = getState().general.selected.selectedWall;
    const { id: rugId } = getState().general.selected.selectedRug;
    const { id: selectedLighting } =
      getState().general.selected.selectedLighting;
    const { id: selectedPlant } = getState().general.selected.selectedPlant;
    const { id: selectedRoomDecor } =
      getState().general.selected.selectedRoomDecor;
    const { id: selectedWallDecor } =
      getState().general.selected.selectedWallDecor;

    const decorParams = [
      selectedLighting,
      selectedPlant,
      selectedRoomDecor,
      selectedWallDecor,
    ];

    const existsDecorParams: string[] = [];

    decorParams.forEach(decorParam => {
      if (decorParam) {
        existsDecorParams.push(decorParam.toString());
      }
    });

    const existsDecorParamsToString = existsDecorParams.join(',');

    const params = new URLSearchParams({
      originalPhotoName: originalPhotoName,
      wallColorID: wallID?.toString() || '',
      floorTileID: floorID?.toString() || '',
      rugID: rugId?.toString() || '',
      decorIDs: existsDecorParamsToString,
      lookUrl: url?.toString() || '',
      type: isSphere ? 'hardcodedsphere' : 'stillphoto',
    });

    try {
      const checkQueue = await axios.get('activeApplylookRequests', {
        signal,
      });

      if (checkQueue.data >= 6) throw new Error('queue');

      const newLookResponse = await axios.post<NewLookResponse>(
        `v2/applyLookNew?${params.toString()}`,
        {
          signal,
        },
      );

      const minToSeconds =
        newLookResponse.data.minutesRemaining * 60 +
        newLookResponse.data.secondsRemaining;

      dispatch(setTime(minToSeconds));

      if (minToSeconds >= 45) {
        dispatch(setIsLoading('longTime'));
      } else {
        dispatch(setIsLoading('shortTime'));
      }

      const imgName = await applyLookReq({
        id: newLookResponse.data.ID,
        signal,
        dispatch,
      });

      const imgURL = isSphere
        ? `${
            import.meta.env.VITE_BASE_IMAGE_URL
          }/photosphere_results_hardcoded/${imgName}.jpg`
        : `${import.meta.env.VITE_BASE_IMAGE_URL}/still_images/${imgName}.jpg`;

      dispatch(setCurrentProcessId(newLookResponse.data.ID));
      Storage.save_data(selectedItemsData);
      sessionStorage.setItem('isSphere', JSON.stringify(isSphere));
      sessionStorage.setItem(
        'originalPhotoName',
        JSON.stringify(originalPhotoName),
      );
      sessionStorage.setItem('before', JSON.stringify(before));

      return imgURL;
    } catch (error) {
      const err = error as AxiosError;

      if (err.message === 'canceled' || err.message === 'queue')
        return rejectWithValue(err.message);

      toast.error(err.message);
      return rejectWithValue(err.message);
    }
  },
  //TODO:
  // {
  //   condition: (_, { getState }) => {
  //     const { current } = getState();
  //     const loading = current.isLoading;
  //     const after = current.currentImageInfo.after;

  //     if (loading && !after) {
  //       return false;
  //     }
  //   },
  // },
);
