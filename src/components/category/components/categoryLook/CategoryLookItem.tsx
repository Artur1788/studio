import { FC } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  updateSelectedLook,
  updateSelectedName,
} from '../../../../features/general/generalSlice';
import { HardcodedLook } from '../../../../features/general/general.types';
import { getName } from '../../../../utils/getNameFromUrl';

interface CategoryLookItemProps {
  lookItem: HardcodedLook;
}

export const CategoryLookItem: FC<CategoryLookItemProps> = ({ lookItem }) => {
  const dispatch = useAppDispatch();
  const { selectedLook, selectedWall, selectedFloor } = useAppSelector(
    state => state.general.selected,
  );

  const handleSelectedLook = () => {
    const lookName = getName(lookItem.url);

    dispatch(updateSelectedLook(lookItem));
    dispatch(updateSelectedName(lookName));
  };

  return (
    <div
      key={lookItem.id}
      className={`
        flex 
        shrink-0 
        grow-0 
        items-center 
        justify-center 
        rounded-[12px]
        ${
          selectedLook.wallColor.id === selectedWall.id &&
          selectedLook.floorTile.id === selectedFloor.id &&
          selectedLook.id === lookItem.id &&
          `border-2
          border-[#59D07F]`
        }
      `}
      onClick={handleSelectedLook}
    >
      <img
        src={lookItem.url}
        className={`
          h-[35vmin] 
          rounded-[10px]
        ${
          selectedLook.id === lookItem.id &&
          selectedLook.wallColor.id === selectedWall.id &&
          selectedLook.floorTile.id === selectedFloor.id &&
          `h-[36vmin]
          rounded-[10px]`
        }`}
      />
    </div>
  );
};
