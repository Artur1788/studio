import { FC } from 'react';

import finishBounce from '../../../assets/gif/FinishBounce.gif';


export const LoadingFinishBounce: FC = () => {
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
      <img
        src={finishBounce}
        alt='pending gif'
        className='h-auto w-[20%]'
      />
    </div>
  );
};
