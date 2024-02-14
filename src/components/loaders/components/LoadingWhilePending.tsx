import { FC } from 'react';

import loaderPending from '../../../assets/gif/loader1.gif';

export const LoadingWhilePending: FC = () => {
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
        src={loaderPending}
        alt='pending gif'
        className='h-auto w-[20%]'
      />
    </div>
  );
};
