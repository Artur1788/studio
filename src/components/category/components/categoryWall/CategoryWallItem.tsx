import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { Wall } from '../../../../features/general/general.types';
import {
  addActionBar,
  updateSelectedWall,
} from '../../../../features/general/generalSlice';

interface CategoryLookItemProps {
  wallItem: Wall;
}

export const CategoryWallItem: FC<CategoryLookItemProps> = ({ wallItem }) => {
  const dispatch = useAppDispatch();
  const { selectedWall, selectedTab } = useAppSelector(
    state => state.general.selected,
  );
  const { actionBar } = useAppSelector(state => state.general);

  const handleWallItem = () => {
    dispatch(updateSelectedWall(wallItem));
    selectedTab &&
      !actionBar.includes(selectedTab) &&
      wallItem.id !== 0 &&
      dispatch(addActionBar(selectedTab));
  };

  return (
    <div
      key={wallItem.id}
      className={`
        flex 
        h-[23vmin]
        w-[23vmin] 
        shrink-0 
        grow-0 
        items-center
        justify-center
        rounded-full 
        ${
          selectedWall.id === wallItem.id &&
          ` h-[24vmin]
            w-[24vmin] 
            border-2 
          border-[#59D07F]`
        }
      `}
      style={{ backgroundColor: wallItem.hexCode }}
      onClick={handleWallItem}
    />
  );
};
