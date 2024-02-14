import { FC } from 'react';

import { Outlet } from 'react-router-dom';

import { Footer, Header, Qr } from '../../components';

const Root: FC = () => {
  return (
    <>
      <div className='flex min-h-screen flex-col md:hidden'>
        <Header />
        <main className='flex flex-grow flex-col items-center'>
          <Outlet />
        </main>
        <Footer />
      </div>
      <div className='hidden md:block'>
        <Qr />
      </div>
    </>
  );
};

export default Root;
