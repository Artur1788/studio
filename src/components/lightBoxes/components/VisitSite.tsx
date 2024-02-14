import { FC, MouseEventHandler } from 'react';

import Arrow from '../../../assets/icons/whiteArrow.svg';
import {
  DetailsInfo,
  Lighting,
  Plant,
  RoomDecor,
  Rug,
  WallDecor,
} from '../../../features/general/general.types';

interface VisitSiteProps {
  selectedData?: Lighting | Plant | RoomDecor | WallDecor | Rug | DetailsInfo;
}

export const VisitSite: FC<VisitSiteProps> = ({ selectedData }) => {
  const handleRedirect: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    window.open(selectedData?.urlOnVendorPage, '_self');
  };

  
  return (
    <>
      <div
        className={`
        mt-20
        flex
        w-screen
        justify-between
        px-14`}
      >
        <div
          className='
        flex 
        flex-col 
        justify-between'
        >
          <div className='flex flex-col'>
            <div
              className='
            pb-5 
            text-[13px] 
            font-normal 
            text-[#FFF]'
            >
              Paint by {selectedData?.vendorName}
            </div>
            <div
              className='
            text-lg 
            font-semibold 
            text-[#FFF] 
            underline'
            >
              {selectedData?.name}
            </div>
            <div
              className='
            text-[12px] 
            font-normal 
            text-[#FFF]'
            >
              {selectedData?.skuNumber}
            </div>
          </div>
        </div>
        <div
          className={`
        flex 
        shrink-0 
        grow-0 
        justify-center
        rounded-full`}
        >
          <img
            alt='icon'
            src={
              selectedData?.thumbnailURL
                ? selectedData?.thumbnailURL
                : selectedData?.logo
            }
            className={`
              h-[25vmin] 
              w-[25vmin]
              rounded-full
              `}
          />
        </div>
      </div>
      <div
        className='
          my-16 
          flex 
          h-[50px]
          justify-center
          px-14 
          text-center 
          text-[14px] 
          font-normal 
          text-[#FFF]'
      >
        <p>
          Visit vendor’s websites to ensure product details before purchasing,
          as on-screen representation may vary.
        </p>
      </div>

      <button
        className='
            my-[20px]
            flex
            h-[45px]
            w-[225px]
            cursor-pointer
            items-center
            justify-center
            self-center
            rounded-[50px]
            bg-light-green
            p-2
            text-[22px]
            font-bold
            text-white
            transition-colors
            duration-150
            active:bg-[#00140A]'
      >
        <div
          className='flex items-center'
          onPointerDown={handleRedirect}
        >
          <p className='ml-8'>Continue</p>
          <Arrow className='ml-8' />
        </div>
      </button>
    </>
  );
};
