import { FC } from 'react';

export const CanvasFallBack: FC = () => {
  return (
    <div
      className='
      flex
      h-full
      items-center 
      justify-center 
      bg-black
      '
    >
      <h1
        className='
            text-xxl
            font-bold
            text-neutral-700
            '
      >
        Loading...
      </h1>
    </div>
  );
};
