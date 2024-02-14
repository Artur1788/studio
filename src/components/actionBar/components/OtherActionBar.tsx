import { FC, useState } from 'react';

import { ActionType } from '../types';
import { useAppSelector } from '../../../app/hooks';

interface OtherProps {
  name: string;
}
export const OtherActionBar: FC<OtherProps> = ({ name }) => {
  const [activeData, setActiveData] = useState<string>('');
  const { selectedTab } = useAppSelector(state => state.general.selected);
  const ActionComponent = ActionType[name as keyof typeof ActionType];

  const handleRedirect = () => {
    window.open(activeData, '_self');
  };

  return (
    <>
      <div
        className={`
            mx-2
            my-2
            flex 
            h-44
            justify-between 
            rounded-[10px] 
            bg-gradient-to-b 
            from-[rgba(234,234,234,0.30)]
            from-0%
            to-[rgba(234,234,234,0.15)]
            to-100%
            p-5`}
        onClick={handleRedirect}
      >
        {selectedTab && <ActionComponent setActiveData={setActiveData} />}
      </div>
    </>
  );
};
