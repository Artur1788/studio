import { FC } from 'react';

import { CategoryLooks } from './categoryLook/CategoryLook';
import { CategoryWalls } from './categoryWall/CategoryWall';
import { CategoryFloor } from './categoryFloor/CategoryFloor';
import { CategoryRugs } from './categoryRug/CategoryRug';
import { CategoryPlants } from './categoryPlant/CategoryPlant';
import { CategoryLighting } from './categoryLighting/CategoryLighting';
import { useAppSelector } from '../../../app/hooks';
import { CategoryWallDecor } from './categoryWallDecor/CategoryWallDecor';
import { CategoryRoomDecor } from './categoryRoomDecor/CategoryRoomDecor';

interface CategoryThumbnailProps {
  openSubCategory: boolean;
}

const CategoryType = {
  LOOKS: CategoryLooks,
  WALLS: CategoryWalls,
  FLOOR: CategoryFloor,
  RUGS: CategoryRugs,
  PLANTS: CategoryPlants,
  LIGHTING: CategoryLighting,
  'WALL DECOR': CategoryWallDecor,
  'ROOM DECOR': CategoryRoomDecor,
};

export const CategoryThumbnail: FC<CategoryThumbnailProps> = ({
  openSubCategory,
}) => {
  const { selectedTab } = useAppSelector(state => state.general.selected);

  const CurrentTab = CategoryType[selectedTab as keyof typeof CategoryType];

  return (
    <>
      <nav className={`relative flex w-full`}>
        <div
          className={`
            no-scrollbar
            flex
            gap-x-2
            overflow-x-scroll 
            pl-2`}
        >
          {selectedTab && <CurrentTab openSubCategory={openSubCategory} />}
        </div>
      </nav>
    </>
  );
};
