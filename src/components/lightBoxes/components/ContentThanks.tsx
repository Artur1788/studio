import { FC } from 'react';

export const ContentThanks: FC = () => {
  return (
    <>
      <div
        className={` 
          mx-20 
          mt-[80px] 
          hyphens-manual 
          pb-5 
          text-center
          text-xxl
          font-bold
          text-white`}
      >
        <p>Thanks!</p>
      </div>
      <div className='flex items-center text-base font-normal text-white'>
        We’ll text ya soon.
      </div>
    </>
  );
};
