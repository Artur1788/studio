import { FC, RefObject, useEffect, useRef, useState } from 'react';

import { Canvas, RootState } from '@react-three/fiber';
import toast from 'react-hot-toast';
import * as Three from 'three';

import { DeviceOrientationControls } from '@react-three/drei';

import { LightBoxes, ShareBtn } from '..';
import { useAppSelector } from '../../app/hooks';
import { DetailsInfo } from '../../features/general/general.types';
import { useDocumentHidden } from '../../hooks/useDocumentHidden';
import { Camera } from './components/Camera';
import { Circle } from './components/Circle';
import { Controls } from './components/Controls';
import { SphereMarker } from './components/SphereMarker';

interface SphereProps {
  isPortrait: boolean;
  isFullScreen: boolean;
  originalImage: string;
  afterImage: string;
  isOriginalImage: boolean;
  isGyroActive: boolean;
  cameraPosition: [number, number, number];
  cameraRef: RefObject<Three.PerspectiveCamera>;
}

export const Sphere: FC<SphereProps> = ({
  isPortrait,
  isFullScreen,
  originalImage,
  afterImage,
  isOriginalImage,
  isGyroActive,
  cameraRef,
  cameraPosition,
}) => {
  const [isRotate, setIsRotate] = useState<boolean>(true);
  const [isCanvasCreated, setIsCanvasCreated] = useState<boolean>(false);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const sphereWrapperRef = useRef<HTMLDivElement>(null);
  const [detailsInfo, setDetailsInfo] = useState<DetailsInfo>(
    {} as DetailsInfo,
  );
  const { isLoading: currentLoader } = useAppSelector(state => state.current);
  const { isLoading: stillLoader } = useAppSelector(state => state.stillPhoto);

  const isLoading = currentLoader || stillLoader;

  const { placements } = useAppSelector(
    state => state.current.currentImageInfo.lookResult,
  );
  const processId = useAppSelector(
    state => state.current.currentImageInfo.processId,
  );

  const shareUrl = async () => {
    try {
      const url = (import.meta.env.VITE_HOST_URL + processId) as string;

      if (navigator.share) {
        await navigator.share({
          url,
          title: 'Check out this look in my space!',
        });
      } else {
        await navigator.clipboard.writeText(url);
      }
    } catch (error) {
      const err = error as Error;
      const hasAbortText = err.message.includes('Abort');
      if (!hasAbortText) {
        toast.error(err.message);
      }
    }
  };

  const checkIsCreated = ({ gl }: RootState) => {
    gl.setPixelRatio(window.devicePixelRatio);
    setIsCanvasCreated(true);
  };

  useEffect(() => {
    setDetailsInfo(prevState => ({
      ...prevState,
      logo: placements?.[0].logo,
      name: placements?.[0].name,
      vendorName: placements?.[0].vendorName,
      skuNumber: placements?.[0].skuNumber,
      urlOnVendorPage: placements?.[0].vendorURL,
    }));
  }, [placements]);

  useDocumentHidden(isModalOpen);

  return (
    <>
      <div
        ref={sphereWrapperRef}
        className={`
        h-[396px]
        ${
          isFullScreen && !isPortrait
            ? 'order-2 h-full w-[calc(100%-69px)]'
            : isFullScreen
              ? 'h-[calc(100%-48px)]'
              : `${isLoading ? 'absolute -z-10' : 'relative'}`
        }
      `}
      >
        {isCanvasCreated && !isFullScreen && (
          <>
            <h1
              className='
                  absolute
                  left-3
                  top-3
                  z-10
                  text-xs
                  font-normal
                  uppercase
                  text-white
            '
            >
              demo room
            </h1>
            <ShareBtn
              label='share'
              onClick={shareUrl}
            />
          </>
        )}

        <div
          ref={canvasWrapperRef}
          className={`relative h-full w-full`}
        >
          {afterImage && (
            <Canvas
              fallback={null}
              className='relative'
              onCreated={checkIsCreated}
            >
              <Circle
                position={[0, 0, 0]}
                originalImage={originalImage}
                afterImage={afterImage}
                isRotate={isRotate}
                setIsRotate={setIsRotate}
                setIsReversed={setIsReversed}
                isOriginalImage={isOriginalImage}
              >
                <group dispose={null}>
                  {!isOriginalImage &&
                    !!placements.length &&
                    placements.map(
                      (
                        {
                          vendorName,
                          vendorURL,
                          name,
                          logo,
                          skuNumber,
                          marker,
                          productType,
                        },
                        idx,
                      ) => {
                        if (marker) {
                          return (
                            <SphereMarker
                              key={idx + vendorURL}
                              name={name}
                              vendorName={vendorName}
                              logo={logo}
                              skuNumber={skuNumber}
                              vendorUrl={vendorURL}
                              productType={productType}
                              canvasElement={canvasWrapperRef}
                              position={marker.coordinates}
                              setDetailsInfo={setDetailsInfo}
                              setIsModalOpen={setIsModalOpen}
                            />
                          );
                        }
                      },
                    )}
                </group>
              </Circle>

              <Camera
                sphereWrapperRef={sphereWrapperRef}
                cameraRef={cameraRef}
                cameraPosition={cameraPosition}
              />
              {isGyroActive ? (
                <DeviceOrientationControls />
              ) : (
                <Controls
                  isReversed={isReversed}
                  isRotate={isRotate}
                />
              )}
            </Canvas>
          )}
        </div>
      </div>
      {isModalOpen && (
        <LightBoxes
          selectedModalType='visitSite'
          selectedData={detailsInfo}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
