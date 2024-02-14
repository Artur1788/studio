import { FC } from 'react';

import { useAppSelector } from '../../app/hooks';
import { ActionBarBoxes } from './components/ActionBarBoxes';

export const ActionBar: FC = () => {
  const { selectedTab } = useAppSelector(state => state.general.selected);

  return (
    <>
      <div
        className='
        w-full'
      >
        {selectedTab && <ActionBarBoxes />}
      </div>
      <div
        className='
          my-[35px] 
          flex
          w-[80%] 
          justify-center 
          text-center 
          text-[12px] 
          font-normal 
          text-[#606060]'
      >
        <p className='m-0'>
          Visit vendor’s websites to ensure product details before purchasing,
          as on-screen representation may vary.
        </p>
      </div>
    </>
  );
};
