import { FC } from 'react';

import { Lighting } from '../../../../features/general/general.types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addActionBar,
  updateSelectedLighting,
} from '../../../../features/general/generalSlice';

interface CategoryLightingItemProps {
  lightItem: Lighting;
}

export const CategoryLightingItem: FC<CategoryLightingItemProps> = ({
  lightItem,
}) => {
  const dispatch = useAppDispatch();
  const { selectedLighting, selectedTab } = useAppSelector(
    state => state.general.selected,
  );

  const handleSelectedLightingItem = () => {
    dispatch(updateSelectedLighting(lightItem));
    selectedTab && lightItem.id !== 0 && dispatch(addActionBar(selectedTab));
  };

  return (
    <div
      key={lightItem.id}
      className={`
        flex 
        shrink-0
        grow-0
        items-center 
        justify-center
        rounded-full
      ${
        selectedLighting.id === lightItem.id &&
        `border-2
      border-[#59D07F]`
      }
  `}
      onClick={handleSelectedLightingItem}
    >
      <img
        alt='lightingIcon'
        src={lightItem.thumbnailURL}
        className={`
        h-[23vmin]
        w-[23vmin] 
        rounded-full
     ${
       selectedLighting.id === lightItem.id &&
       `h-[24vmin] 
       w-[24vmin]
        rounded-full
        `
     }`}
      />
    </div>
  );
};
