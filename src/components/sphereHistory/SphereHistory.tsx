import { FC, useEffect, useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Photo_360 from '../../assets/icons/360_photo.svg';
import {
  setBeforeImage,
  setIsSphere,
  setOriginalPhotoName,
} from '../../features/currentImage/currentImageSlice';
import { Sphere } from '../../features/spherePhotos/spherePhotos.types';
import { ThumbnailImageLoader } from '../thumbnailImageLoader/ThumbnailImageLoader';

interface SphereHistoryProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SphereHistory: FC<SphereHistoryProps> = ({ setOpen }) => {
  const [text, setText] = useState<boolean>(false);
  const [sphereHistory, setSphereHistory] = useState<Sphere[]>([]);
  const { spherePhotos } = useAppSelector(state => state.spherePhotos);
  const originalImgUrl = useAppSelector(
    state => state.current.currentImageInfo.before,
  );
  const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const timerID = useRef<number | undefined>(undefined);
  const minCount = 8;

  const handleClick = () => {
    setText(true);
  };

  const checkImageLoadedState = () => {
    setIsImgLoaded(true);
  };

  const chooseSpherePhoto = (
    e: React.MouseEvent<HTMLDivElement>,
    name: string,
    sphereUrl: string,
  ) => {
    e.stopPropagation();

    if (!sphereUrl) return;

    setOpen(false);
    dispatch(setIsSphere(true));
    dispatch(setBeforeImage(sphereUrl));
    dispatch(setOriginalPhotoName(name));
  };

  useEffect(() => {
    const data = [...spherePhotos];
    const count = minCount - data.length;
    for (let i = 0; i < count; i++) {
      data.push({} as Sphere);
    }

    setSphereHistory(data);
  }, [spherePhotos]);

  useEffect(() => {
    if (text) {
      timerID.current = setTimeout(function () {
        setText(false);
      }, 3000);
    }
    return () => clearTimeout(timerID.current);
  }, [text]);

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
          flex
          w-[156px]
          shrink-0
          grow-0
          items-center
          justify-center
          rounded-[15px]
          border-[1.5px]
          border-solid
          border-[#676767]
        active:text-white
      `}
        onClick={handleClick}
      >
        <div
          className={`
          fillSvg
          flex
          items-center
          justify-center`}
        >
          {text ? (
            <p className='text-base font-bold text-white'>Coming soon</p>
          ) : (
            <>
              <Photo_360 />
              <p className='pl-[10px]'>360 Photo</p>
            </>
          )}
        </div>
      </div>
      {!!sphereHistory.length &&
        sphereHistory.map(({ id, name, sphereUrl, thumbnailUrl }, idx) => {
          return (
            <div
              onClick={e => chooseSpherePhoto(e, name, sphereUrl)}
              key={id ? id : `${idx}${name}`}
              className={`
                relative
                flex
                w-[156px]
                shrink-0
                grow-0
                items-center
                justify-center
                overflow-hidden
                rounded-[15px]
                bg-[#2A2A2A]
                ${
                  sphereUrl === originalImgUrl
                    ? 'border-2 border-[#59D07F]'
                    : 'border-none'
                }
             `}
            >
              {thumbnailUrl && (
                <>
                  <img
                    onLoad={checkImageLoadedState}
                    className='object-cover'
                    src={thumbnailUrl}
                    alt={name}
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
          );
        })}
    </div>
  );
};
