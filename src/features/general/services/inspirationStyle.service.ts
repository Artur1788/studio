import axios from '../../../axios';

import {
  GetInspirationStyleI,
  HardcodedLook as InspirationStyleI,
} from '../general.types';
import {
  updateSelectedFloor,
  updateSelectedLook,
  updateSelectedWall,
} from '../generalSlice';

export const getInspirationStyleResult = async (
  payload: GetInspirationStyleI,
): Promise<InspirationStyleI | undefined> => {
  const { id, signal, dispatch } = payload;
  const inspirationStyleResult = await axios.get<InspirationStyleI>(
    `getUploadLookResult/${id}`,
    {
      signal,
    },
  );
  if (inspirationStyleResult.status !== 200) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(getInspirationStyleResult(payload));
      }, 3000);
    });
  }
  if (inspirationStyleResult.status === 200) {
    const newStyle = inspirationStyleResult.data;
    dispatch(updateSelectedLook(newStyle));
    dispatch(updateSelectedFloor(newStyle.floorTile));
    dispatch(updateSelectedWall(newStyle.wallColor));
    return newStyle;
  }
};
