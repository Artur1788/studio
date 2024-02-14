import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import { LightBoxes } from '..';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Photo from '../../assets/icons/photo_button.svg';
import {
  setBeforeImage,
  setIsSphere,
  setOriginalPhotoName,
} from '../../features/currentImage/currentImageSlice';
import { fetchStillPhoto } from '../../features/stillPhotos/stillAsyncThunks';
import { Still } from '../../features/stillPhotos/stillPhotos.types';
import { useDocumentHidden } from '../../hooks/useDocumentHidden';
import { imageOrientationCorrector } from '../../utils/imageOrientationCorrector';
import { ThumbnailImageLoader } from '../thumbnailImageLoader/ThumbnailImageLoader';

interface StillHistoryProps {
  stillPhotos: Still[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StillHistory: FC<StillHistoryProps> = ({
  stillPhotos,
  setOpen,
}) => {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState<boolean>(false);
  const [stillData, setStillData] = useState<Still[]>([]);
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const originalImgUrl = useAppSelector(
    state => state.current.currentImageInfo.before,
  );
  const stillUploadRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const checkImageLoadedState = () => {
    setIsImgLoaded(true);
  };

  const uploadTakenPhoto: React.ChangeEventHandler<
    HTMLInputElement
  > = async e => {
    const file = e.target.files?.[0];
    const formData = new FormData();

    if (!file) return;

    setIsLightBoxOpen(false);
    setOpen(false);

    const fixedOrientationFile = await imageOrientationCorrector(file);
    if (!fixedOrientationFile) {
      toast.error('Something went wrong');
      return;
    }

    formData.append('file', fixedOrientationFile);

    const { name, url } = await dispatch(fetchStillPhoto(formData)).unwrap();

    dispatch(setIsSphere(false));
    dispatch(setBeforeImage(url));
    dispatch(setOriginalPhotoName(name));

    e.target.value = '';
  };

  const setStillPhoto = (name: string, url: string) => {
    if (!url) return;

    setOpen(false);
    dispatch(setIsSphere(false));
    dispatch(setBeforeImage(url));
    dispatch(setOriginalPhotoName(name));
  };

  const openCaptureModal: MouseEventHandler = e => {
    e.stopPropagation();
    setIsLightBoxOpen(true);
  };

  useDocumentHidden(isLightBoxOpen);

  useEffect(() => {
    const minCount = 10;
    const data = [...stillPhotos];
    const count = minCount - data.length;

    if (count > 0) {
      for (let i = 0; i < count; i++) {
        data.push({} as Still);
      }
    }
    setStillData(data);
  }, [stillPhotos]);

  return (
    <div
      className={`
        no-scrollbar
        my-3
        flex
        h-[78px]
        gap-x-[5px]
        overflow-x-scroll
        pl-3
        text-base
        font-normal
      text-[#676767]`}
    >
      <div
        className={`
          group
          flex
          w-[78px]
          shrink-0
          grow-0
          flex-col
          items-center
          justify-center
          rounded-[15px]
          border-[1.5px]
          border-solid
          border-[#676767]
          bg-transparent
          active:text-white
      `}
        onPointerDown={openCaptureModal}
      >
        <Photo className='group-active:borderSvg' />
        <label
          className={`
          mt-1
          flex
          flex-col
          items-center
          justify-center`}
        >
          Photo
        </label>
        <input
          ref={stillUploadRef}
          className='hidden'
          type='file'
          accept='.png,.jpeg,.jpg'
          capture='environment'
          onChange={uploadTakenPhoto}
        />
      </div>
      {!!stillData.length &&
        stillData.map(({ thumbnailUrl, id, name, url }, idx) => (
          <div
            onClick={() => setStillPhoto(name, url)}
            key={id ? id : idx + 1}
            className={`
            relative
            flex
            h-full
            w-[78px]
            shrink-0
            grow-0
            items-center
            justify-center
            overflow-hidden
            rounded-[15px]
            bg-[#2A2A2A]
            ${
              url === originalImgUrl
                ? 'border-2 border-[#59D07F]'
                : 'border-none'
            }
           `}
          >
            {thumbnailUrl && (
              <>
                <img
                  onLoad={checkImageLoadedState}
                  className='
                    block
                    h-full
                    w-full
                    max-w-full
                    '
                  src={thumbnailUrl}
                  alt='photo'
                />
                {!isImgLoaded && (
                  <div
                    className='
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                      bg-black'
                  >
                    <ThumbnailImageLoader />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      {isLightBoxOpen && (
        <LightBoxes
          stillUploadRef={stillUploadRef}
          selectedModalType={'stillCapture'}
          setIsModalOpen={setIsLightBoxOpen}
        />
      )}
    </div>
  );
};
