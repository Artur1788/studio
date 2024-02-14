import { FC, useEffect, useRef } from 'react';

import Blank from '../../../../assets/icons/blank.svg';
import { CategoryFloorItem } from './CategoryFloorItem';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  addActionBar,
  removeActionBar,
  updateSelectedFloor,
} from '../../../../features/general/generalSlice';
import { fetchFloor } from '../../../../features/general/asyncThunks/floorAsyncThunk';

interface CategoryFloorProps {
  openSubCategory: boolean;
}

export const CategoryFloor: FC<CategoryFloorProps> = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.general);
  const { next_page, data } = useAppSelector(state => state.general.floor);
  const { selectedFloor, selectedLook, selectedTab } = useAppSelector(
    state => state.general.selected,
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleBlankFloor = () => {
    selectedTab && dispatch(removeActionBar(selectedTab));
    dispatch(
      updateSelectedFloor({
        code: '',
        floorIcon: '',
        id: 0,
        logo: '',
        name: '',
        type: '',
        urlOnVendorPage: '',
        vendorID: 0,
        vendorName: '',
      }),
    );
  };

  const handleSelectedFloorItem = () => {
    dispatch(updateSelectedFloor(selectedLook.floorTile));
    selectedTab &&
      selectedLook.floorTile.id !== 0 &&
      dispatch(addActionBar(selectedTab));
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollWidth, scrollLeft, clientWidth } = scrollContainer;

      if (
        Math.round(scrollLeft) + Math.round(clientWidth) >=
          Math.round(scrollWidth) &&
        !isLoading
      ) {
        dispatch(fetchFloor({ next_page }));
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, dispatch, next_page, scrollContainerRef]);

  return (
    <div
      className='
      my-4 
      flex 
      w-full 
      flex-col'
    >
      <div
        className=' 
          no-scrollbar 
          flex
          w-full
          shrink-0
          grow-0 
          overflow-x-scroll '
      >
        {/* {openSubCategory && <SubCategoryItem />} */}
      </div>
      <div
        ref={scrollContainerRef}
        className=' 
          no-scrollbar
          flex 
          w-full 
          flex-row 
          items-center 
          gap-x-2 
          overflow-x-scroll'
      >
        <div
          className={`
            flex
            shrink-0 
            grow-0
            items-center 
            justify-center
            rounded-full 
          bg-[#EAEAEA]
          ${
            selectedFloor.id === 0
              ? ` blankSvg
                  h-[24vmin] 
                  w-[24vmin]
                  border-2
                border-[#59D07F]`
              : ` h-[22vmin]
                w-[22vmin]`
          }`}
          onClick={handleBlankFloor}
        >
          <Blank
            className={`${
              selectedFloor.id === 0
                ? ` h-[10vmin]
                   w-[87vmin] `
                : `h-[12vmin]
                  w-[87vmin] `
            }`}
          />
        </div>
        <div
          className={`
            flex 
            shrink-0 
            grow-0
            items-center
            justify-center
             rounded-full
          ${
            selectedLook.floorTile.id === selectedFloor.id &&
            `
             border-2 
          border-[#59D07F]`
          }
        `}
          onClick={handleSelectedFloorItem}
        >
          <img
            alt='floorIcon'
            src={selectedLook.floorTile.floorIcon}
            className={`
              h-[23vmin]
              w-[23vmin] 
              rounded-full
            ${
              selectedLook.floorTile.id === selectedFloor.id &&
              `h-[24vmin] 
               w-[24vmin]
               rounded-full
                `
            }`}
          />
        </div>
        {!!data?.length &&
          data?.map((floorItem, index) => (
            <CategoryFloorItem
              key={index}
              floorItem={floorItem}
            />
          ))}
        {isLoading && <p>Loading ...</p>}
      </div>
    </div>
  );
};
