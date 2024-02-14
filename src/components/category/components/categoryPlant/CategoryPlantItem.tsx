import { FC } from 'react';

import { Plant } from '../../../../features/general/general.types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addActionBar,
  updateSelectedPlant,
} from '../../../../features/general/generalSlice';

interface CategoryPlantItemProps {
  plantItem: Plant;
}

export const CategoryPlantItem: FC<CategoryPlantItemProps> = ({
  plantItem,
}) => {
  const dispatch = useAppDispatch();
  const { selectedPlant, selectedTab } = useAppSelector(
    state => state.general.selected,
  );

  const handleSelectedPlantItem = () => {
    dispatch(updateSelectedPlant(plantItem));
    selectedTab && plantItem.id !== 0 && dispatch(addActionBar(selectedTab));
  };
  return (
    <div
      key={plantItem.id}
      className={`
        flex 
        shrink-0
        grow-0
        items-center 
        justify-center
        rounded-full
      ${
        selectedPlant.id === plantItem.id &&
        `border-2
      border-[#59D07F]`
      }
  `}
      onClick={handleSelectedPlantItem}
    >
      <img
        alt='plantIcon'
        src={plantItem.thumbnailURL}
        className={`
      h-[23vmin]
      w-[23vmin] 
        rounded-full
     ${
       selectedPlant.id === plantItem.id &&
       `h-[24vmin] 
       w-[24vmin]
        rounded-full
        `
     }`}
      />
    </div>
  );
};
