import { FC } from 'react';

import Logo from '../../assets/logo_web.svg';
import LogoWhite from '../../assets/logo_white.svg';
import Banner from '../../assets/banner.svg';
import QR from '../../assets/qr.svg';

export const Qr: FC = () => {
  const year = new Date().getFullYear();

  return (
    <div
      className='
        min-h-screen
        w-full 
        bg-gradient-to-b
      from-[rgba(0,20,10,0.74)]
      to-[#00140A]
        mix-blend-multiply'
    >
      <div
        className='
          flex
          h-[100px]
          w-full
          items-center
          justify-center  
          bg-white'
      >
        <Logo />
      </div>
      <div className='flex flex-col'>
        <Banner className='flex h-full w-full' />
        <div className='absolute left-0 right-0 flex flex-col items-center justify-center'>
          <div
            className='
              mt-14
              flex
              h-[17vw]
              w-[17vw]
              items-center
              justify-center
              rounded-[3vw]
              bg-gradient-to-b
            from-[#59D07F]
            to-[#4DB671]'
          >
            <QR className='flex h-[15vw] w-[15vw]' />
          </div>
          <p className='mt-[20px] text-[3vw] font-semibold text-white'>
            Scan to experience on mobile!
          </p>
        </div>
      </div>
      <div className='mt-10 flex flex-col items-center'>
        <p className='mb-3 flex text-white'>
          Powered by <LogoWhite className='ml-2' />
        </p>
        <p className='mb-10 flex text-sm font-normal text-[rgba(255,255,255,0.49)]'>
          Copyright DoSpace, Inc. {year} | (402) 534-1402 | v1.0
        </p>
      </div>
    </div>
  );
};
