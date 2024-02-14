import { FC } from 'react';

import Light from '../../../assets/icons/light.svg';
import LevelHorizontal from '../../../assets/icons/level_horizontal.svg';
import Capture from '../../../assets/icons/capture.svg';

interface StillCaptureProps {
  stillUploadRef?: React.RefObject<HTMLInputElement>;
}

export const StillCapture: FC<StillCaptureProps> = ({ stillUploadRef }) => {
  const callStillInputClick = () => {
    stillUploadRef?.current?.click();
  };

  return (
    <div className='flex pb-20 h-svh flex-col justify-between'>
      <div
        className={` 
          mx-20 
          items-center 
          justify-between 
          hyphens-manual
          pb-5
          text-center
          text-[16px]
          font-bold
        text-white`}
      >
        <p>FOR BEST RESULTS:</p>
      </div>

      <div className='flex flex-col items-center justify-between gap-y-8'>
        <div className='flex flex-col items-center justify-center'>
          <p className='pb-3 text-[16px] font-normal text-white'>
            Light your space.
          </p>
          <Light />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='pb-3 text-[16px] font-normal text-white'>
            Keep camera level and horizontal.
          </p>
          <LevelHorizontal />
        </div>
        <div className='flex flex-col items-center justify-center'>
          <p className='pb-3 text-[16px] font-normal text-white'>
            Capture ceiling, walls, and floor.
          </p>
          <Capture />
        </div>
      </div>

      <button
        onClick={callStillInputClick}
        type='submit'
        className='
            my-[20px]
            flex
            h-[45px]
            w-[165px]
            cursor-pointer
            items-center
            justify-center
            self-center
            rounded-[50px]
            bg-light-green
            p-2
            leading-[26px]
            text-[22px]
            font-bold
            text-white
            transition-colors
            duration-150
            active:bg-[#00140A]'
      >
        Capture
      </button>
    </div>
  );
};
