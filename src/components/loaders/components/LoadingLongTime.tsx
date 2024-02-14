import { FC, MouseEventHandler, useEffect, useRef, useState } from 'react';

import loaderLong from '../../../assets/gif/loader3.gif';
import { LightBoxes } from '../..';
import { useAppSelector } from '../../../app/hooks';

export const LoadingLongTime: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedModalType, setSelectedModalType] = useState<string>('');
  const remainingTime = useAppSelector(
    state => state.current.currentImageInfo.timeRemaining,
  );
  const [seconds, setSeconds] = useState<number>(remainingTime);
  const intervalId = useRef<number | undefined>(undefined);
  const isMounted = useRef<boolean>(false);

  const handleOpenTextMe: MouseEventHandler<HTMLButtonElement> = e => {
    e.stopPropagation();

    setSelectedModalType('textMe');

    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isMounted.current) {
      setSeconds(prevSeconds => prevSeconds - 1);
      isMounted.current = true;
    }

    if (!seconds) {
      return clearInterval(intervalId.current);
    }

    intervalId.current = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId.current);
    };
  }, [seconds]);

  return (
    <div
      className='
        flex
        h-full
        flex-col
        items-center
        justify-center
        bg-gradient-to-b
        from-[#EEEEEE]
        to-[rgba(255,255,255,0.0)]'
    >
      <div className='flex flex-grow flex-col items-center justify-center'>
        <img
          src={loaderLong}
          alt='long gif'
          className='h-auto w-[20%] '
        />
        <p className='mt-[24px] text-lg font-normal text-[#747474]'>
          {Math.floor(seconds / 60)}:{seconds % 60}
        </p>
      </div>
      <button
        onClick={handleOpenTextMe}
        type='submit'
        className='
        font-base 
        mb-4 
        items-center 
        justify-center 
        rounded-[53px] 
        bg-[#838383] 
        px-4 
        py-2 
        text-white'
      >
        Text me when it&apos;s ready
      </button>
      {isModalOpen && (
        <LightBoxes
          selectedModalType={selectedModalType}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
};
