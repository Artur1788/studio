import { FC, useEffect, useRef, useState } from 'react';

import * as Three from 'three';
// import { Helmet } from 'react-helmet-async';

import {
  Sphere,
  Still,
  Toolbar,
  UploadPhotoErrorFallback,
  ViewerLoader,
} from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetAfterImage } from '../../features/currentImage/currentImageSlice';
import { fetchCurrentImage } from '../../features/currentImage/getCurrentImageThunk';
import { fetchSphereData } from '../../features/spherePhotos/sphereAsyncThunks';
import { useDocumentHidden } from '../../hooks/useDocumentHidden';
import { useOrientation } from '../../hooks/useOrientation';
import { WaitingLoading } from '../loaders/components/WaitingLoading';

export const ViewerWrapper: FC = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isOriginalImage, setIsOriginalImage] = useState<boolean>(false);
  const [isGyroActive, setIsGyroActive] = useState<boolean>(false);
  const [cameraPosition, setCameraPosition] = useState<
    [number, number, number]
  >([-1, 0, 0.05]);
  const cameraRef = useRef<Three.PerspectiveCamera>(null);
  const isPortrait = useOrientation();
  const isDone = useRef<boolean>(false);
  const reqInfo = useRef<{ abort: () => void }>();
  const dispatch = useAppDispatch();

  useDocumentHidden(isFullScreen);

  const {
    currentImageInfo,
    isLoading: currentLoader,
    error,
  } = useAppSelector(state => state.current);
  const { isLoading: stillLoader } = useAppSelector(state => state.stillPhoto);

  const isLoading = currentLoader || stillLoader;

  //TODO:
  // const {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   selectedLook,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   selectedTab,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   selectedName,
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   selectedSubTab,
  //   ...restSelectedData
  // } = useAppSelector(state => state.general.selected);

  // const values = Object.values(restSelectedData);

  // const isValueExists = values.some(value => {
  //   if (value.id) {
  //     return true;
  //   }
  // });

  const selectedWallId = useAppSelector(
    state => state.general.selected.selectedWall.id,
  );

  const selectedFloorId = useAppSelector(
    state => state.general.selected.selectedFloor.id,
  );

  const selectedRugID = useAppSelector(
    state => state.general.selected.selectedRug.id,
  );

  const selectedLightingID = useAppSelector(
    state => state.general.selected.selectedLighting.id,
  );

  const selectedPlantID = useAppSelector(
    state => state.general.selected.selectedPlant.id,
  );

  const selectedRoomDecorID = useAppSelector(
    state => state.general.selected.selectedRoomDecor.id,
  );

  const selectedWallDecorID = useAppSelector(
    state => state.general.selected.selectedWallDecor.id,
  );

  useEffect(() => {
    // if (isValueExists) {
    setIsOriginalImage(false);
    dispatch(resetAfterImage(''));
    reqInfo.current = dispatch(fetchCurrentImage());
    window.scrollTo({
      top: 0,
      left: 0,
    });
    // }

    return () => {
      if (reqInfo.current) {
        reqInfo.current.abort();
      }
    };
  }, [
    dispatch,
    selectedWallId,
    selectedFloorId,
    selectedRugID,
    selectedLightingID,
    selectedPlantID,
    selectedRoomDecorID,
    selectedWallDecorID,
    currentImageInfo.originalPhotoName,
    // isValueExists,
  ]);

  useEffect(() => {
    if (!isDone.current) {
      dispatch(fetchSphereData());
      isDone.current = true;
    }
  }, [dispatch]);

  if (error && error !== 'Aborted' && error !== 'queue') {
    return <UploadPhotoErrorFallback message={error} />;
  }

  return (
    <>
      {/* <Helmet>
        <meta
          data-rh='true'
          property='og:image'
          content={previewImage}
        />
      </Helmet> */}
      <div
        className={`
        flex
         ${
           isFullScreen && !isPortrait
             ? 'fixed inset-0 z-10 h-[100dvh] w-full'
             : isFullScreen
               ? 'fixed inset-0 z-10 h-[100dvh] w-full flex-col'
               : 'relative w-full flex-col'
         }
      `}
      >
        {isLoading ? <ViewerLoader /> : null}
        {error === 'queue' ? (
          <WaitingLoading
            isFullScreen={isFullScreen}
            isPortrait={isPortrait}
          />
        ) : currentImageInfo.isSphere ? (
          <Sphere
            isPortrait={isPortrait}
            isFullScreen={isFullScreen}
            originalImage={currentImageInfo.before}
            afterImage={currentImageInfo.after}
            isOriginalImage={isOriginalImage}
            isGyroActive={isGyroActive}
            cameraRef={cameraRef}
            cameraPosition={cameraPosition}
            // getSharedImage={getSharedImage}
          />
        ) : (
          <Still
            isPortrait={isPortrait}
            isFullScreen={isFullScreen}
            isOriginalImage={isOriginalImage}
            originalImage={currentImageInfo.before}
            afterImage={currentImageInfo.after}
            // getSharedImage={getSharedImage}
          />
        )}
        <Toolbar
          isLoading={isLoading}
          isPortrait={isPortrait}
          isFullScreen={isFullScreen}
          isSphere={currentImageInfo.isSphere}
          isOriginalImage={isOriginalImage}
          isGyroActive={isGyroActive}
          cameraRef={cameraRef}
          setIsFullScreen={setIsFullScreen}
          setIsOriginalImage={setIsOriginalImage}
          setIsGyroActive={setIsGyroActive}
          setCameraPosition={setCameraPosition}
        />
      </div>
    </>
  );
};
