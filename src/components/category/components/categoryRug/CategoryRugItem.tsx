import { FC } from 'react';

import { Rug } from '../../../../features/general/general.types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addActionBar,
  updateSelectedRug,
} from '../../../../features/general/generalSlice';

interface CategoryRugItemProps {
  rugItem: Rug;
}

export const CategoryRugItem: FC<CategoryRugItemProps> = ({ rugItem }) => {
  const dispatch = useAppDispatch();
  const { selectedRug, selectedTab } = useAppSelector(
    state => state.general.selected,
  );

  const handleSelectedRugItem = () => {
    dispatch(updateSelectedRug(rugItem));
    selectedTab && rugItem.id !== 0 && dispatch(addActionBar(selectedTab));
  };

  return (
    <div
      key={rugItem.id}
      className={`
        flex 
        shrink-0
        grow-0
        items-center 
        justify-center
        rounded-full
      ${
        selectedRug.id === rugItem.id &&
        `border-2
      border-[#59D07F]`
      }
  `}
      onClick={handleSelectedRugItem}
    >
      <img
        alt='rugIcon'
        src={rugItem.thumbnailURL}
        className={`
        h-[23vmin]
        w-[23vmin] 
        rounded-full
     ${
       selectedRug.id === rugItem.id &&
       `h-[24vmin] 
       w-[24vmin]
        rounded-full
        `
     }`}
      />
    </div>
  );
};
