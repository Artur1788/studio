import { FC, MouseEventHandler, useState } from 'react';

import waiting from '../../../assets/gif/waiting.gif';
import { LightBoxes } from '../..';

interface WaitingLoadingProps {
  isFullScreen: boolean;
  isPortrait: boolean;
}

export const WaitingLoading: FC<WaitingLoadingProps> = ({
  isFullScreen,
  isPortrait,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedModalType, setSelectedModalType] = useState<string>('');

  const handleOpenTextMe: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    setSelectedModalType?.('textMe');

    setIsModalOpen?.(true);
  };

  return (
    <>
      <div
        className={`
      flex
      w-full
      flex-col
      items-center
      justify-center
      bg-gradient-to-b
      from-[#EEEEEE]
      to-[rgba(255,255,255)]
      py-4
      ${isFullScreen && !isPortrait ? 'order-2 h-full' : 'order-1 h-[396px]'}
      `}
      >
        <div className='flex flex-col items-center justify-center px-20'>
          <p className='pb-6 text-xxl font-bold text-[#000]'>WHOA!</p>
          <p className='text-center text-base font-normal text-[#747474]'>
            We are experiencing extremely high demand at the moment.
          </p>
          <img
            src={waiting}
            alt='waiting gif'
            className='h-auto w-[20%] py-10'
          />
          <p className='pb-10 text-base font-normal text-[#747474]'>
            You spot in line is secure.
          </p>
        </div>
        <button
          onClick={handleOpenTextMe}
          type='submit'
          className='
          font-base 
          mb-[10px]
          mt-[15px] 
          flex 
          cursor-pointer 
          items-end
          justify-center
          self-center
          rounded-[53px]
          bg-[#838383]
          p-2
          px-4
          text-center
          font-normal
          text-white'
        >
          Text me when it&apos;s ready
        </button>
      </div>
      {isModalOpen && (
        <LightBoxes
          selectedModalType={selectedModalType}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
