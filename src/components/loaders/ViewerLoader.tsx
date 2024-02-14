import { FC } from 'react';

import { useAppSelector } from '../../app/hooks';
import { LoadingFinishBounce } from './components/LoadingFinishBounce';
import { LoadingLongTime } from './components/LoadingLongTime';
import { LoadingShortTime } from './components/LoadingShortTime';
import { LoadingWhilePending } from './components/LoadingWhilePending';

const loaders = {
  connecting: LoadingWhilePending,
  shortTime: LoadingShortTime,
  longTime: LoadingLongTime,
  finishing: LoadingFinishBounce,
};

export const ViewerLoader: FC = () => {
  const loading = useAppSelector(state => state.current.isLoading);

  const Loader =
    loaders[loading as keyof typeof loaders] || LoadingWhilePending;

  return (
    <div className='relative h-[396px] w-full bg-white'>
      <div className='absolute z-20 h-full w-full'>
        <Loader />
      </div>
    </div>
  );
};
