import { useNavigate, useParams } from 'react-router-dom';

import { useLayoutEffect, useRef } from 'react';

import toast from 'react-hot-toast';

import { useAppDispatch } from '../../app/hooks';
import axios from '../../axios';
import { CategorySlider, ViewerWrapper } from '../../components';
import {
  LookResult,
  PlacementItem,
} from '../../features/currentImage/currentImage.types';
import { TabData } from '../../features/general/general.types';
import {
  setSelectedLookUrl,
  updateGeneralData,
} from '../../features/general/generalSlice';
import {
  setBeforeImage,
  setIsSphere,
  setOriginalPhotoName,
} from '../../features/currentImage/currentImageSlice';

const Home = () => {
  const { processId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const checkRef = useRef<boolean>(false);

  useLayoutEffect(() => {
    if (processId && !checkRef.current) {
      checkRef.current = true;

      (async () => {
        try {
          const lookResultResponse = await axios.get<LookResult>(
            `v2/applyLookResult/${processId}`,
          );

          if (lookResultResponse.data.originalPhotoName) {
            const transformedData = lookResultResponse.data.placements.reduce(
              (prev, curr) => {
                Object.assign(prev, { [curr.productType]: curr });
                return prev;
              },
              {} as Record<TabData, PlacementItem>,
            );

            dispatch(
              setIsSphere(
                lookResultResponse.data.type === 'hardcodedsphere'
                  ? true
                  : false,
              ),
            );
            dispatch(
              setOriginalPhotoName(lookResultResponse.data.originalPhotoName),
            );
            dispatch(setBeforeImage(lookResultResponse.data.originalPhotoURL));
            dispatch(setSelectedLookUrl(lookResultResponse.data.lookUrl));
            dispatch(updateGeneralData(transformedData));
            navigate('/', { replace: true });
          }
        } catch (error) {
          toast.error('Incorrect process ID');
        }
      })();
    }
  }, [dispatch, navigate, processId]);

  return (
    <>
      <ViewerWrapper />
      <CategorySlider />
    </>
  );
};

export default Home;
