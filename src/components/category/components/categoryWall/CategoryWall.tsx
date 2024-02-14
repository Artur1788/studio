import { FC, useEffect, useRef, useState } from 'react';

import Blank from '../../../../assets/icons/blank.svg';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { CategoryWallItem } from './CategoryWallItem';
import {
  addActionBar,
  removeActionBar,
  updateSelectedWall,
} from '../../../../features/general/generalSlice';
import { fetchWall } from '../../../../features/general/asyncThunks/wallAsyncThunk';

export const CategoryWalls: FC = () => {
  const [page] = useState<number>(1);
  const [count] = useState<number>(10);
  const dispatch = useAppDispatch();
  const { selectedWall, selectedLook, selectedTab, selectedName } =
    useAppSelector(state => state.general.selected);
  const { isLoading } = useAppSelector(state => state.general);
  const { data, next_page } = useAppSelector(state => state.general.wall);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isReceivedData = useRef<boolean>(false);

  const handleSelectedWall = () => {
    selectedTab && dispatch(removeActionBar(selectedTab));

    dispatch(
      updateSelectedWall({
        hexCode: '',
        id: 0,
        logo: '',
        name: '',
        rgbCode: [0, 0, 0],
        skuNumber: '',
        urlOnVendorPage: '',
        vendorID: 0,
        vendorName: '',
      }),
    );
  };

  const handleWall = () => {
    dispatch(updateSelectedWall(selectedLook.wallColor));
    selectedTab &&
      selectedLook.wallColor.id !== 0 &&
      dispatch(addActionBar(selectedTab));
  };

  useEffect(() => {
    if (!isReceivedData.current && !data && selectedName) {
      const queryData = { page, count, selectedName };

      dispatch(fetchWall(queryData));

      isReceivedData.current = true;
    }
  }, [dispatch, page, count, selectedName, data]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const { scrollWidth, scrollLeft, clientWidth } = scrollContainer;

      if (
        Math.round(scrollLeft) + Math.round(clientWidth) >=
          Math.round(scrollWidth) &&
        !isLoading &&
        selectedName
      ) {
        dispatch(fetchWall({ selectedName, next_page }));
      }
    };

    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
    };
  }, [isLoading, dispatch, next_page, selectedName, scrollContainerRef]);

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
            selectedWall.id === 0
              ? ` blankSvg
                  h-[24vmin] 
                  w-[24vmin]
                  border-2
                border-[#59D07F]`
              : ` h-[23vmin] 
                  w-[23vmin]`
          }`}
          onClick={handleSelectedWall}
        >
          <Blank
            className={`
              h-[10vmin]
            w-[87vmin] `}
          />
        </div>
        <div
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
          selectedLook?.wallColor?.id === selectedWall?.id &&
          ` h-[24vmin]
            w-[24vmin] 
            border-2 
          border-[#59D07F]`
        }
      `}
          style={{ backgroundColor: selectedLook.wallColor?.hexCode }}
          onClick={handleWall}
        />
        {!!selectedLook?.wallPallet?.length &&
          selectedLook?.wallPallet?.map(wallPallet => (
            <CategoryWallItem
              key={wallPallet.id}
              wallItem={wallPallet}
            />
          ))}
        {!!data?.length &&
          data?.map(wallItem => (
            <CategoryWallItem
              key={wallItem.id}
              wallItem={wallItem}
            />
          ))}
        {isLoading && <p>Loading ...</p>}
      </div>
    </div>
  );
};
