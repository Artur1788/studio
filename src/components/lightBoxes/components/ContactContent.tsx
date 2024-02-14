import { FC } from 'react';

import Email from '../../../assets/icons/email.svg';
import Phone from '../../../assets/icons/phone.svg';
import useLongPress from '../../../hooks/useLongPress';

export const ContactContent: FC = () => {
  const onLongPress = () => {
    navigator.clipboard.writeText('info@dospace.tech');
  };

  const longPressEvent = useLongPress(onLongPress);

  return (
    <>
      <div
        className={` 
        mx-20 
        mt-[80px] 
        hyphens-manual 
        pb-5 
        text-center
      text-white`}
      >
        <p>We’d love to hear from ya!</p>
      </div>
      <div
        className='
      flex 
      flex-col 
      items-center 
      justify-center'
      >
        <div
          className='group flex items-center py-5'
          {...longPressEvent}
        >
          <Email className='group-active:activeSvg' />
          <p
            className='
            pl-2.5 
            text-base 
          text-white 
            underline 
          decoration-white 
          active:text-light-green 
          active:decoration-light-green'
          >
            info@dospace.tech
          </p>
        </div>
        <div className='group flex items-center'>
          <Phone className='group-active:activeSvg' />
          <p
            className='pl-2.5 text-base text-white active:text-light-green 
          active:decoration-light-green'
          >
            <a href='tel:+(402) 534-1402'>(402) 534-1402</a>
          </p>
        </div>
      </div>
    </>
  );
};
