import { FC, useEffect, useRef } from 'react';

import Blank from '../../../../assets/icons/blank.svg';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import {
  removeActionBar,
  updateSelectedRoomDecor,
} from '../../../../features/general/generalSlice';
import { CategoryRoomDecorItem } from './CategoryRoomDecorItem';
import { fetchDecor } from '../../../../features/general/asyncThunks/decorAsyncThunk';

export const CategoryRoomDecor: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, selected } = useAppSelector(state => state.general);
  const { data, next_page } = useAppSelector(state => state.general.roomDecor);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const handleBlankRoomDecor = () => {
    selected.selectedTab && dispatch(removeActionBar(selected.selectedTab));

    dispatch(
      updateSelectedRoomDecor({
        id: 0,
        name: '',
        logo: '',
        urlOnVendorPage: '',
        vendorID: 0,
        vendorName: '',
        paused: false,
        cost: 0,
        preprocessed: false,
        editable: false,
        productImageURL: '',
        thumbnailURL: '',
        skuNumber: '',
        width: 0,
        height: 0,
        price: 0,
        sphereUrl: null,
      }),
    );
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const decorTab = 'roomDecor';
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollWidth, scrollLeft, clientWidth } = scrollContainer;

      if (
        Math.round(scrollLeft) + Math.round(clientWidth) >=
          Math.round(scrollWidth) &&
        !isLoading
      ) {
        dispatch(fetchDecor({ decorTab, next_page }));
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, dispatch, next_page, scrollContainerRef]);

  return (
    <div
      className='my-4 
      flex 
      w-full 
      flex-col'
    >
      <div
        ref={scrollContainerRef}
        className=' 
          no-scrollbar 
          flex 
          w-full 
          flex-row 
          items-center 
          gap-x-2
          overflow-x-scroll '
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
            selected.selectedRoomDecor.id === 0
              ? ` blankSvg
                  h-[24vmin] 
                  w-[24vmin]
                  border-2
                border-[#59D07F]`
              : ` h-[23vmin]
                w-[23vmin]`
          }`}
          onClick={handleBlankRoomDecor}
        >
          <Blank
            className={` 
              h-[10vmin]
            w-[87vmin] `}
          />
        </div>
        {!!data?.length &&
          data?.map((roomDecorItem, index) => (
            <CategoryRoomDecorItem
              key={index}
              roomDecorItem={roomDecorItem}
            />
          ))}
        {isLoading && <p>Loading ...</p>}
      </div>
    </div>
  );
};
