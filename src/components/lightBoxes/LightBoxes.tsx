import { FC, useRef, useState } from 'react';

import { useOnClickOutside } from '../../hooks/useOutsideClick';

import Close_icon from '../../assets/icons/close_light_box.svg';

import { Content } from './components/Content';
import {
  DetailsInfo,
  Lighting,
  Plant,
  RoomDecor,
  Rug,
  WallDecor,
} from '../../features/general/general.types';

interface LightBoxesProps {
  stillUploadRef?: React.RefObject<HTMLInputElement>;
  setSelectedModalType?: React.Dispatch<React.SetStateAction<string>>;
  selectedModalType: string;
  setIsModalOpen: (value: boolean) => void;
  selectedData?: Lighting | Plant | RoomDecor | WallDecor | Rug | DetailsInfo;
}

export const LightBoxes: FC<LightBoxesProps> = ({
  stillUploadRef,
  selectedData,
  setSelectedModalType,
  selectedModalType,
  setIsModalOpen,
}) => {
  const [isLightBoxOpen, setIsLightBoxOpen] = useState<boolean>(true);

  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = () => {
    setIsLightBoxOpen(false);
    setIsModalOpen(false);
  };

  useOnClickOutside(ref, handleClickOutside, 'click');

  return (
    <div
      className={
        isLightBoxOpen
          ? `fixed
          inset-0
          z-[999]
          flex
          h-screen
          flex-col
          overflow-hidden
          bg-[rgba(0,0,0,0.9)]
          backdrop-blur-[2px]`
          : `hidden`
      }
    >
      <div
        className={`
          mt-[50px]
          flex
          h-full
          flex-col
          items-center
          `}
      >
        <div
          className={`
          absolute
          right-0
          top-0
          px-6
          py-8`}
        >
          <Close_icon className={`h-4 w-auto`} />
        </div>
        <div
          className={`flex flex-col items-center`}
          ref={ref}
        >
          <Content
            stillUploadRef={stillUploadRef}
            selectedData={selectedData}
            selectedModalType={selectedModalType}
            setSelectedModalType={setSelectedModalType}
          />
        </div>
      </div>
    </div>
  );
};
