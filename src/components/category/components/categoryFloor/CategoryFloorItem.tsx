import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addActionBar,
  updateSelectedFloor,
} from '../../../../features/general/generalSlice';
import { Floor } from '../../../../features/general/general.types';

interface CategoryFloorItemProps {
  floorItem: Floor;
}

export const CategoryFloorItem: FC<CategoryFloorItemProps> = ({
  floorItem,
}) => {
  const dispatch = useAppDispatch();
  const { selectedFloor, selectedTab } = useAppSelector(
    state => state.general.selected,
  );
  const { actionBar } = useAppSelector(state => state.general);

  const handleSelectedFloorItem = () => {
    dispatch(updateSelectedFloor(floorItem));
    selectedTab &&
      !actionBar.includes(selectedTab) &&
      floorItem.id !== 0 &&
      dispatch(addActionBar(selectedTab));
  };

  return (
    <div
      key={floorItem.id}
      className={`
        flex 
        shrink-0
        grow-0
        items-center 
        justify-center
        rounded-full
      ${
        selectedFloor.id === floorItem.id &&
        `border-2
      border-[#59D07F]`
      }
  `}
      onClick={handleSelectedFloorItem}
    >
      <img
        alt='floorIcon'
        src={floorItem.floorIcon}
        className={`
        h-[23vmin]
        w-[23vmin] 
        rounded-full
     ${
       selectedFloor.id === floorItem.id &&
       `h-[24vmin] 
        w-[24vmin]
        rounded-full
        `
     }`}
      />
    </div>
  );
};
