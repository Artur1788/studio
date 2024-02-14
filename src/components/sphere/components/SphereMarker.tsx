import { Html } from '@react-three/drei';
import { MeshProps } from '@react-three/fiber';
import { FC, memo, useRef, useState } from 'react';

import { DetailsInfo, TabData } from '../../../features/general/general.types';
import { checkElementsClientRectDistance } from '../../../utils/checkClientRectDistance';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { updateSelectedTab } from '../../../features/general/generalSlice';

interface SphereMarkerProps extends MeshProps {
  canvasElement: React.RefObject<HTMLDivElement>;
  name: string;
  vendorName: string;
  skuNumber: string | null;
  logo: string;
  vendorUrl: string;
  productType: TabData;
  setDetailsInfo: React.Dispatch<React.SetStateAction<DetailsInfo>>;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SphereMarker: FC<SphereMarkerProps> = memo(
  ({
    position,
    canvasElement,
    name,
    skuNumber,
    vendorName,
    logo,
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

      if (productType === selectedTab) {
        setDetailsInfo(prevData => ({
          ...prevData,
          name,
          vendorName,
          skuNumber,
          logo,
          urlOnVendorPage: vendorUrl,
        }));
        setIsModalOpen(true);
        return;
      }

      dispatch(updateSelectedTab(productType));

      const markerContentWidth = textWrapperRef.current!.offsetWidth + 22 + 28;

      const isOutsideWidth = checkElementsClientRectDistance(
        canvasElement,
        e.target as HTMLElement,
        markerContentWidth,
      );

      setIsTextSwap(isOutsideWidth);
    };

    return (
      <mesh position={position}>
        <Html
          zIndexRange={[1, 10]}
          position={[0, 0, 0]}
          className='relative flex items-center gap-x-2'
        >
          <div
            className={`h-[15px] w-[15px] flex-shrink-0 flex-grow-0 rounded-full drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]
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
            z-10
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
            <p className='whitespace-nowrap text-lg font-medium capitalize drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]'>
              {name}
            </p>
            <small
              className={`text-[11px] font-normal drop-shadow-[0_0_4px_rgba(0,0,0,0.25)] ${
                isTextSwap ? 'self-end' : 'self-start'
              }`}
            >
              by {vendorName}
            </small>
          </div>
        </Html>
      </mesh>
    );
  },
);
