import { FC, MouseEventHandler, useRef, useState } from 'react';

import toast from 'react-hot-toast';

import Hamburger_icon from '../../../assets/icons/hamburger.svg';
import Close_icon from '../../../assets/icons/close.svg';
import { useOnClickOutside } from '../../../hooks/useOutsideClick';
import { LightBoxes } from '../..';
import { useDocumentHidden } from '../../../hooks/useDocumentHidden';

export const Hamburger: FC = () => {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedModalType, setSelectedModalType] = useState<string>('');
  const ref = useRef<HTMLDivElement | null>(null);
  useDocumentHidden(isModalOpen);

  const handleClickOutside = () => {
    setIsNavOpen(false);
  };

  const handleOpenJoin: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();

    setSelectedModalType('join');

    setIsModalOpen(true);
    setIsNavOpen(false);
  };

  const handleOpenContact: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    setSelectedModalType('contact');

    setIsModalOpen(true);
    setIsNavOpen(false);
  };

  const handle360Cam = () => {
    toast('Coming soon');
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <>
      <nav
        ref={ref}
        className='h-full'
      >
        <div
          className='flex h-full items-center justify-center'
          onPointerDown={() => setIsNavOpen(prev => !prev)}
        >
          <Hamburger_icon
            className={`h-4 w-auto`}
            title='Hamburger'
          />
        </div>
        <div
          className={
            isNavOpen
              ? `absolute
                right-0
                top-0
                z-30
                flex
                h-[17rem]
                w-[11.5rem]
                flex-col
                justify-end
                rounded-l-2xl
                bg-black
                pb-5`
              : `hidden`
          }
        >
          <div
            className={`
              absolute
              right-0
              top-0
              px-4
              py-4`}
            onPointerDown={() => setIsNavOpen(false)}
          >
            <Close_icon
              title='Close Icon'
              className='h-4 w-auto'
            />
          </div>
          <ul
            className={`flex
              flex-col
              items-end
              justify-end
              pr-6 `}
          >
            <div
              className={`
                my-4
                text-base
              text-mid-gray-400
                active:text-lg
              active:text-white`}
              onClick={handleOpenJoin}
            >
              <p>Join</p>
            </div>
            <div
              className={`
                  my-4
                  text-base
                text-mid-gray-400
                  active:text-lg
                active:text-white`}
              onClick={() => handle360Cam()}
            >
              <p>360 Photo Cam</p>
            </div>
            <div
              className={`
                my-4
                text-base
                text-mid-gray-400
                active:text-lg
                active:text-white`}
              onClick={handleOpenContact}
            >
              <p>Contact</p>
            </div>
          </ul>
        </div>
      </nav>
      {isModalOpen && (
        <LightBoxes
          setSelectedModalType={setSelectedModalType}
          selectedModalType={selectedModalType}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
};
