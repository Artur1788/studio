import { FC, useEffect, useRef, useState } from 'react';

import loaderShort from '../../../assets/gif/loader2.gif';
import { useAppSelector } from '../../../app/hooks';

export const LoadingShortTime: FC = () => {
  const remainingTime = useAppSelector(
    state => state.current.currentImageInfo.timeRemaining,
  );
  const [seconds, setSeconds] = useState<number>(remainingTime);
  const intervalId = useRef<number | undefined>(undefined);
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    if (!seconds) {
      return clearInterval(intervalId.current);
    }

    if (!isMounted.current) {
      setSeconds(prevSeconds => prevSeconds - 1);
      isMounted.current = true;
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
        w-full
        items-center
        justify-center
        bg-gradient-to-b
        from-[#EEEEEE]
        to-[rgba(255,255,255,0.0)]'
    >
      <div className=' my-auto flex flex-col items-center justify-center'>
        <img
          src={loaderShort}
          alt='short gif'
          className='h-auto w-[20%]'
        />
        <p className='mt-[24px] text-lg font-normal text-[#747474]'>
          {Math.floor(seconds / 60)}:{seconds % 60}
        </p>
      </div>
    </div>
  );
};
