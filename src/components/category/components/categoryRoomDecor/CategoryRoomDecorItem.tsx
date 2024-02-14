import { FC } from 'react';

import { RoomDecor } from '../../../../features/general/general.types';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addActionBar,
  updateSelectedRoomDecor,
} from '../../../../features/general/generalSlice';

interface CategoryRoomDecorItemProps {
  roomDecorItem: RoomDecor;
}

export const CategoryRoomDecorItem: FC<CategoryRoomDecorItemProps> = ({
  roomDecorItem,
}) => {
  const dispatch = useAppDispatch();
  const { selectedRoomDecor, selectedTab } = useAppSelector(
    state => state.general.selected,
  );

  const handleSelectedRoomDecorItem = () => {
    dispatch(updateSelectedRoomDecor(roomDecorItem));
    selectedTab &&
      roomDecorItem.id !== 0 &&
      dispatch(addActionBar(selectedTab));
  };

  return (
    <div
      key={roomDecorItem.id}
      className={`
        flex 
        shrink-0
        grow-0
        items-center 
        justify-center
        rounded-full
      ${
        selectedRoomDecor.id === roomDecorItem.id &&
        `border-2
      border-[#59D07F]`
      }
  `}
      onClick={handleSelectedRoomDecorItem}
    >
      <img
        alt='roomDecorIcon'
        src={roomDecorItem.thumbnailURL}
        className={`
        h-[23vmin]
        w-[23vmin] 
        rounded-full
     ${
       selectedRoomDecor.id === roomDecorItem.id &&
       `h-[24vmin] 
       w-[24vmin]
        rounded-full
        `
     }`}
      />
    </div>
  );
};
