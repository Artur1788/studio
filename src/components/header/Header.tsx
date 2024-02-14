import { FC } from 'react';

import Logo from '../../assets/logo_black.svg';

import { Hamburger } from './components/Hamburger';

export const Header: FC = () => {
  return (
    <div className='flex h-11 items-center justify-between px-4'>
      <a
        href='https://www.dospace.tech/'
        className='flex h-full flex-row items-center'
      >
        <Logo
          className='h-[22px] w-auto flex-shrink-0'
          title='Logo'
        />
        <p className='font-inter mt-[5px] text-xs font-normal italic text-[#939393]'>
          beta
        </p>
      </a>
      <Hamburger />
    </div>
  );
};
