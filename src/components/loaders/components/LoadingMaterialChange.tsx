import { FC } from 'react';

import loadingLong from '../../../assets/gif/loader3.gif';

export const LoadingMaterialChange: FC = () => {
  return (
    <div
      className='  
        flex
        h-full
        w-full 
        items-center
        justify-center 
        bg-[rgba(0,0,0,0.8)]
        opacity-90
        backdrop-blur-[2px]
        '
    >
      <img
        src={loadingLong}
        alt='pending gif'
        className='h-auto w-[20%]'
      />
    </div>
  );
};
