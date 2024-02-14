import { FC, useState } from 'react';

import { ActionType } from '../types';
interface ActiveProps {
  name: string;
}

export const ActiveActionBar: FC<ActiveProps> = ({ name }) => {
  const [activeData, setActiveData] = useState<string>('');
  const CurrentActionTab = ActionType[name as keyof typeof ActionType];

  const handleRedirect = () => {
    window.open(activeData, '_self');
  };


  return (
    <>
      <div
        className={`
          mx-2
          flex
          h-44
          justify-between
          rounded-[10px]
          bg-gradient-to-b
          from-[#EAEAEA]
          from-0%
          to-[rgba(234,234,234,0.50)]
          to-100%
          p-5`}
        onClick={handleRedirect}
      >
        {name && (
          <CurrentActionTab
            setActiveData={setActiveData}
          />
        )}
      </div>
    </>
  );
};
