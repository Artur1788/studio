import { FC } from 'react';

export const ContentWelcome: FC = () => {
  return (
    <>
      <div
        className={` 
          mx-20 
          mt-[80px] 
          hyphens-manual 
          pb-5 
          text-center
          font-bold
          text-xxl
          text-white`}
      >
        <p>Welcome!</p>
      </div>
      <div className='flex items-center text-base font-normal text-white'>
        Please check your email for confirmation.
      </div>
    </>
  );
};
