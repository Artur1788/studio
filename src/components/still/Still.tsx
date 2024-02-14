import { FC, useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { LightBoxes, ShareBtn } from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

import { setIsLoading } from '../../features/currentImage/currentImageSlice';
import { DetailsInfo } from '../../features/general/general.types';
import { useDocumentHidden } from '../../hooks/useDocumentHidden';
import { StillMarker } from './components/StillMarker';

interface StillProps {
  isPortrait: boolean;
  isFullScreen: boolean;
  isOriginalImage: boolean;
  originalImage: string;
  afterImage: string;
}

export const Still: FC<StillProps> = ({
  isPortrait,
  isFullScreen,
  isOriginalImage,
  originalImage,
  afterImage,
  // getSharedImage,
}) => {
  const stillWrapperRef = useRef<HTMLDivElement>(null);
  const { isLoading: currentLoader } = useAppSelector(state => state.current);
  const { isLoading: stillLoader } = useAppSelector(state => state.stillPhoto);

  const isLoading = currentLoader || stillLoader;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [detailsInfo, setDetailsInfo] = useState<DetailsInfo>(
    {} as DetailsInfo,
  );
  const { placements } = useAppSelector(
    state => state.current.currentImageInfo.lookResult,
  );
  const processId = useAppSelector(
    state => state.current.currentImageInfo.processId,
  );

  const checkImageLoaded = () => {
    dispatch(setIsLoading(null));
  };

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

  useEffect(() => {
    setDetailsInfo(prevState => ({
      ...prevState,
      logo: placements?.[0].logo,
      name: placements?.[0].name,
      skuNumber: placements?.[0].skuNumber,
      vendorName: placements?.[0].vendorName,
      urlOnVendorPage: placements?.[0].vendorURL,
    }));
  }, [placements]);

  useDocumentHidden(isModalOpen);

  return (
    <>
      <div
        className={`
        flex
        ${
          isFullScreen && !isPortrait
            ? 'order-2 w-[calc(100%-69px)]'
            : isFullScreen
              ? 'h-[calc(100%-48px)]'
              : `${isLoading ? 'absolute -z-10 h-[396px]' : 'h-auto'}`
        }
    `}
      >
        {!isFullScreen && (
          <ShareBtn
            label='share'
            onPointerUp={shareUrl}
          />
        )}
        <div
          className={`
            flex
            h-full
            w-full
            bg-black
            ${
              isFullScreen && !isPortrait
                ? 'items-stretch'
                : isFullScreen && 'items-center'
            }
          `}
        >
          <div className='w-full'>
            <div
              className='relative flex h-full overflow-hidden'
              ref={stillWrapperRef}
            >
              <img
                className={`
                      h-auto
                      w-full
                      max-w-full
                      ${isOriginalImage ? 'block' : 'hidden'}
                    `}
                src={originalImage}
                alt='before'
              />
              <img
                className={`
                        h-auto
                        w-full
                        max-w-full
                        ${!isOriginalImage ? 'block' : 'hidden'}
                      `}
                src={afterImage}
                onLoad={checkImageLoaded}
                alt='after'
              />
              {placements &&
                !!placements.length &&
                placements.map(
                  (
                    {
                      vendorName,
                      vendorURL,
                      name,
                      skuNumber,
                      logo,
                      marker,
                      productType,
                    },
                    idx,
                  ) => {
                    if (marker) {
                      return (
                        <StillMarker
                          key={idx + vendorURL}
                          name={name}
                          vendorName={vendorName}
                          skuNumber={skuNumber}
                          logo={logo}
                          vendorUrl={vendorURL}
                          productType={productType}
                          logoLocation={marker.coordinates}
                          stillWrapperRef={stillWrapperRef}
                          setDetailsInfo={setDetailsInfo}
                          setIsModalOpen={setIsModalOpen}
                        />
                      );
                    }
                  },
                )}
            </div>
          </div>
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
