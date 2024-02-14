import { FC, RefObject, useRef, useState } from 'react';

import { DetailsInfo, TabData } from '../../../features/general/general.types';
import { checkElementsClientRectDistance } from '../../../utils/checkClientRectDistance';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSelectedTab } from '../../../features/general/generalSlice';

interface StillMarkerProps {
  stillWrapperRef: RefObject<HTMLDivElement>;
  name: string;
  skuNumber: string | null;
  logo: string;
  vendorName: string;
  vendorUrl: string;
  productType: TabData;
  logoLocation: number[];
  setDetailsInfo: React.Dispatch<React.SetStateAction<DetailsInfo>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StillMarker: FC<StillMarkerProps> = ({
  stillWrapperRef,
  name,
  skuNumber,
  logo,
  vendorName,
  logoLocation,
  vendorUrl,
  productType,
  setDetailsInfo,
  setIsModalOpen,
}) => {
  const [isTextSwap, setIsTextSwap] = useState<boolean>(false);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const selectedTab = useAppSelector(
    state => state.general.selected.selectedTab,
  );

  const setActiveMarker: React.PointerEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    e.preventDefault();

    if (productType === selectedTab) {
      setDetailsInfo(prevData => ({
        ...prevData,
        name,
        vendorName,
        logo,
        skuNumber,
        urlOnVendorPage: vendorUrl,
      }));
      setIsModalOpen(true);
      return;
    }

    dispatch(updateSelectedTab(productType));

    const markerContentWidth = textWrapperRef.current!.offsetWidth + 22 + 28;

    const isOutSideWidth = checkElementsClientRectDistance(
      stillWrapperRef,
      e.target as HTMLElement,
      markerContentWidth,
    );

    setIsTextSwap(isOutSideWidth);
  };

  return (
    <div
      className={`absolute flex cursor-pointer items-center gap-x-2`}
      style={{ top: `${logoLocation?.[0]}%`, left: `${logoLocation?.[1]}%` }}
    >
      <div
        className={`h-[15px] w-[15px] flex-shrink-0 flex-grow-0 rounded-full
           ${
             productType === selectedTab ? 'scale-150 bg-[#47F38C]' : 'bg-white'
           }
          `}
        onPointerDown={setActiveMarker}
      />
      <div
        ref={textWrapperRef}
        onPointerDown={setActiveMarker}
        className={`
            absolute
            -top-1
            flex
            flex-col
            flex-nowrap
          text-white
            ${
              productType === selectedTab
                ? 'pointer-events-auto opacity-100'
                : 'pointer-events-none opacity-0'
            }
            ${isTextSwap ? 'right-7' : 'left-7'}
        `}
      >
        <p className='whitespace-nowrap text-lg font-medium capitalize'>
          {name}
        </p>
        <small
          className={`text-[11px] font-normal ${
            isTextSwap ? 'self-end' : 'self-start'
          }`}
        >
          {vendorName}
        </small>
      </div>
    </div>
  );
};
