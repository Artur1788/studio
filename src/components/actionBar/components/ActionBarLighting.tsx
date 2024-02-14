import { FC, useEffect, useState } from 'react';

import ArrowRight from '../../../assets/icons/arrowRight.svg';
import { useAppSelector } from '../../../app/hooks';
import { LightBoxes } from '../..';
import { ActionBarProps } from '../types';

export const ActionBarLighting: FC<ActionBarProps> = ({ setActiveData }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedModalType, setSelectedModalType] = useState<string>('');
  const { selectedLighting } = useAppSelector(state => state.general.selected);

  useEffect(() => {
    setActiveData(selectedLighting.urlOnVendorPage || '');
  }, [setActiveData, selectedLighting.urlOnVendorPage]);

  return (
    <>
      {selectedLighting.id !== 0 ? (
        <>
          <div
            className='
              flex 
              flex-col 
              justify-between'
          >
            <div className='flex flex-col'>
              <div
                className='
              pb-3
              text-[13px] 
              font-normal 
              text-[#5C5C5C]'
              >
                <p>Lighting by {selectedLighting.vendorName}</p>
              </div>
              <div
                className='
              pb-1 
              text-lg 
              font-semibold 
              text-[#00140A]
              underline'
              >
                {selectedLighting.name}
              </div>
              <div
                className='
              text-[12px] 
              font-normal 
              text-[#707070]'
              >
                {selectedLighting.skuNumber}
              </div>
            </div>
            <div className='flex items-center'>
              <div
                className='
              pr-1 
              text-[14px] 
              font-black 
              text-[#4DB671]'
              >
                VISIT SITE
              </div>
              <ArrowRight />
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
            <div
              className={`
            flex
            shrink-0
            grow-0
            items-center
            justify-center 
            rounded-full`}
            >
              <img
                alt='floorIcon'
                src={selectedLighting.thumbnailURL}
                className={`
                h-[28vmin]
                w-full
              rounded-full
              `}
              />
            </div>
          </div>
        </>
      ) : (
        ''
      )}
      {isModalOpen && (
        <LightBoxes
          selectedData={selectedLighting}
          setSelectedModalType={setSelectedModalType}
          selectedModalType={selectedModalType}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
