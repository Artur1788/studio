import { FC } from 'react';

import { WallDecor } from '../../../../features/general/general.types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addActionBar,
  updateSelectedWallDecor,
} from '../../../../features/general/generalSlice';

interface CategoryWallDecorItemProps {
  wallDecorItem: WallDecor;
}

export const CategoryWallDecorItem: FC<CategoryWallDecorItemProps> = ({
  wallDecorItem,
}) => {
  const dispatch = useAppDispatch();
  const { selectedWallDecor, selectedTab } = useAppSelector(
    state => state.general.selected,
  );

  const handleSelectedWallDecorItem = () => {
    dispatch(updateSelectedWallDecor(wallDecorItem));
    selectedTab &&
      wallDecorItem.id !== 0 &&
      dispatch(addActionBar(selectedTab));
  };

  return (
    <div
      key={wallDecorItem.id}
      className={`
        flex 
        shrink-0
        grow-0
        items-center 
        justify-center
        rounded-full
      ${
        selectedWallDecor.id === wallDecorItem.id &&
        `border-2
      border-[#59D07F]`
      }
  `}
      onClick={handleSelectedWallDecorItem}
    >
      <img
        alt='wallDecorIcon'
        src={wallDecorItem.thumbnailURL}
        className={`
        h-[23vmin]
        w-[23vmin] 
        rounded-full
     ${
       selectedWallDecor.id === wallDecorItem.id &&
       `h-[24vmin] 
       w-[24vmin]
        rounded-full
        `
     }`}
      />
    </div>
  );
};
