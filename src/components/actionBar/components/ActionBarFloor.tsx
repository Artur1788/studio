import { FC, useEffect } from 'react';

import { Link } from 'react-router-dom';

import ArrowRight from '../../../assets/icons/arrowRight.svg';
import { useAppSelector } from '../../../app/hooks';
import { ActionBarProps } from '../types';

export const ActionBarFloor: FC<ActionBarProps> = ({ setActiveData }) => {
  const { selectedFloor } = useAppSelector(state => state.general.selected);

  const openFloorSample = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    setActiveData(selectedFloor.urlOnVendorPage);
  }, [setActiveData, selectedFloor.urlOnVendorPage]);

  return (
    <>
      {selectedFloor.id !== 0 ? (
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
              pb-5 
              text-[13px] 
              font-normal 
              text-[#5C5C5C]'
              >
                <p>Floor by {selectedFloor.vendorName}</p>
              </div>
              <div
                className='
              text-lg 
              font-semibold 
              text-[#00140A] 
              underline'
              >
                {selectedFloor.name}
              </div>
              <div
                className='
              text-[12px] 
              font-normal 
              text-[#707070]'
              >
                {selectedFloor.code}
              </div>
            </div>
            <div className='flex items-center'>
              <>
                <div
                  className='
                      pr-1 
                      text-[14px] 
                      font-black 
                    text-[#4DB671]'
                  onClick={openFloorSample}
                >
                  <Link
                    to='http://match.angi.com/dmtm/38861417?m=dospace12345678'
                    target='_blank'
                    rel='noreferrer'
                  >
                    GET INSTALL QUOTES
                  </Link>
                </div>
                <ArrowRight />
              </>
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
                src={selectedFloor.floorIcon}
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
    </>
  );
};
