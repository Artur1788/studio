import { FC, useRef } from 'react';

import { SphereHistory, StillHistory } from '../..';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import Close_button from '../../../assets/icons/close_navbar.svg';
import Line from '../../../assets/icons/line.svg';
import { fetchStillPhoto } from '../../../features/stillPhotos/stillAsyncThunks';
import {
  setBeforeImage,
  setIsLoading,
  setIsSphere,
  setOriginalPhotoName,
} from '../../../features/currentImage/currentImageSlice';
import { useOnClickOutside } from '../../../hooks/useOutsideClick';

export interface ToolbarModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ToolbarModal: FC<ToolbarModalProps> = ({ setOpen }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const { stillPhotos } = useAppSelector(state => state.stillPhoto);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOutside = () => {
    setOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  const uploadStillPhoto: React.ChangeEventHandler<
    HTMLInputElement
  > = async e => {
    const file = e.target.files?.[0];
    const formData = new FormData();

    if (!file) return;
    dispatch(setIsLoading('connecting'));

    formData.append('file', file);

    setOpen(false);

    const { name, url } = await dispatch(fetchStillPhoto(formData)).unwrap();

    dispatch(setIsSphere(false));
    dispatch(setBeforeImage(url));
    dispatch(setOriginalPhotoName(name));

    e.target.value = '';
  };

  return (
    <nav
      className={`
          relative
          flex
          w-full
        `}
      ref={ref}
    >
      <div
        className={`
          no-scrollbar
          flex
          h-full
          w-full
          flex-col
          overflow-x-scroll
          rounded-t-[20px]
          pb-2
          `}
      >
        <div
          className='
              my-2
              flex
              w-full
              flex-col
              items-center
              justify-center
              text-[17px]
              text-[#C9C9C9]'
        >
          <Line
            className='mb-[19px]'
            onClick={handleClose}
          />
          Pick a room
        </div>
        <div
          className='
              flex
              items-end
              justify-end
              pr-[20px]
              text-[15px]
              font-semibold
              text-light-green'
        >
          <label htmlFor='file'>View Library</label>
          <input
            id='file'
            className='hidden'
            type='file'
            accept='.png,.jpeg,.jpg'
            onChange={uploadStillPhoto}
          />
        </div>
        <StillHistory
          stillPhotos={stillPhotos}
          setOpen={setOpen}
        />
        <SphereHistory setOpen={setOpen} />
        <div className='mt-6 flex items-center justify-center'>
          <Close_button onClick={() => setOpen(prev => !prev)} />
        </div>
      </div>
    </nav>
  );
};
