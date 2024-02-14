import { FC, useEffect } from 'react';

import { Form } from '../../form/Form';
import { ContactContent } from './ContactContent';
import { ContentWelcome } from './ContentWelcome.tsx';
import { useAppSelector } from '../../../app/hooks.ts';
import { VisitSite } from './VisitSite.tsx';
import {
  DetailsInfo,
  Lighting,
  Plant,
  RoomDecor,
  Rug,
  WallDecor,
} from '../../../features/general/general.types.ts';
import { StillCapture } from './StillCapture.tsx';
import { ContentThanks } from './ContentThanks.tsx';

const modal = {
  join: Form,
  contact: ContactContent,
  stillCapture: StillCapture,
  welcome: ContentWelcome,
  visitSite: VisitSite,
  textMe: Form,
  thanks: ContentThanks
};

interface Modal {
  stillUploadRef?: React.RefObject<HTMLInputElement>;
  setSelectedModalType?: React.Dispatch<React.SetStateAction<string>>;
  selectedModalType: string;
  selectedData?: Lighting | Plant | RoomDecor | WallDecor | Rug | DetailsInfo;
}

export const Content: FC<Modal> = ({
  stillUploadRef,
  selectedModalType,
  setSelectedModalType,
  selectedData,
}) => {
  const ModalComponent = modal[selectedModalType as keyof typeof modal];
  const { isConfirm } = useAppSelector(state => state.join);

  useEffect(() => {
    if (isConfirm) {
      setSelectedModalType?.('welcome');
    }
  }, [isConfirm, setSelectedModalType]);

  return (
    <>
      {selectedModalType && (
        <ModalComponent
          stillUploadRef={stillUploadRef}
          selectedData={selectedData}
          type={selectedModalType}
        />
      )}
    </>
  );
};
