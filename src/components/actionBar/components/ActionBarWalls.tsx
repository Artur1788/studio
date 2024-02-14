import { FC, useEffect } from 'react';

import { Link } from 'react-router-dom';

import ArrowRight from '../../../assets/icons/arrowRight.svg';
import { useAppSelector } from '../../../app/hooks';
import { ActionBarProps } from '../types';

export const ActionBarWall: FC<ActionBarProps> = ({ setActiveData }) => {
  const { selectedWall } = useAppSelector(state => state.general.selected);

  const openWallSample = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };


  useEffect(() => {
    setActiveData(selectedWall?.urlOnVendorPage);
  }, [setActiveData, selectedWall.urlOnVendorPage]);

  return (
    <>
      {selectedWall.id !== 0 ? (
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
                <p>Paint by {selectedWall?.vendorName}</p>
              </div>
              <div
                className='
                pb-1 
                text-lg 
                font-semibold 
                text-[#00140A]
                underline'
              >
                {selectedWall.name}
              </div>
              <div
                className='
                text-[12px] 
                font-normal 
                text-[#707070]'
              >
                {selectedWall.skuNumber}
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
                  onClick={openWallSample}
                >
                  <Link
                    to='http://match.angi.com/dmtm/38861120?m=dospace12345678'
                    target='_blank'
                    rel='noreferrer'
                  >
                    GET PAINTING QUOTES
                  </Link>
                </div>
                <ArrowRight />
              </>
            </div>
          </div>
          <div
            className={`
            flex
            h-[28vmin]
            w-[28vmin]
            shrink-0
            grow-0 
            justify-between
            rounded-full`}
            style={{
              backgroundColor: selectedWall.hexCode,
            }}
          />
        </>
      ) : (
        ''
      )}
    </>
  );
};
