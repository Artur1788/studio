import axios from '../../axios';
import { fetchApplicableTab } from '../general/asyncThunks/applicableTabThunk';

import { ApplyLookReq, LookResult } from './currentImage.types';
import { setCurrentLookInfo } from './currentImageSlice';

export const applyLookReq = async ({
  id,
  signal,
  dispatch,
}: ApplyLookReq): Promise<string | undefined> => {
  const lookResultResponse = await axios.get<LookResult>(
    `v2/applyLookResult/${id}`,
    {
      signal,
    },
  );

  if (lookResultResponse.status !== 200) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(applyLookReq({ id, signal, dispatch }));
      }, 3000);
    });
  }

  if (lookResultResponse.status === 200) {
    dispatch(fetchApplicableTab());
    dispatch(setCurrentLookInfo(lookResultResponse.data));

    return lookResultResponse.data.photo_name;
  }
};
