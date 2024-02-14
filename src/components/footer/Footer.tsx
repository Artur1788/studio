import { FC } from 'react';

import Logo from '../../assets/logo_white.svg';

export const Footer: FC = () => {
  return (
    <div
      className='
        flex 
        h-48
        flex-col
        items-center 
        justify-around
      bg-black'
    >
      <div
        className='
          flex
          flex-col 
          items-center'
      >
        <Logo />
        <p
          className='
            pt-2 
            text-[29px] 
            font-[350] 
            italic 
          text-[#A6A6A6]'
        >
          Like it. See it. Do it.
        </p>
      </div>
      <p
        className='
          pt-2 
          text-[12px] 
          font-normal 
        text-[#A1A1A1]'
      >
        Copyright DoSpace, Inc. 2024 | (402)534-1402 | v1.0
      </p>
    </div>
  );
};
