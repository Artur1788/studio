import { FC } from 'react';

import { useAppSelector } from '../../../app/hooks';
import { OtherActionBar } from './OtherActionBar';
import { ActiveActionBar } from './ActiveActionBar';

export const ActionBarBoxes: FC = () => {
  const { actionBar, selected } = useAppSelector(state => state.general);

  return (
    <div className=' flex flex-col'>
      {!!actionBar?.length &&
        actionBar?.map((name, index) => {
          return (
            <div key={index}>
              {index === 0 && <ActiveActionBar name={name} />}
              {name !== selected.selectedTab && index !== 0 && (
                <OtherActionBar name={name} />
              )}
            </div>
          );
        })}
    </div>
  );
};
