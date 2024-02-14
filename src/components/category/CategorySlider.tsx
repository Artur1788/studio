import { FC, useEffect, useRef, useState } from 'react';

import { nanoid } from '@reduxjs/toolkit';

import { CategoryThumbnail } from './components/CategoryThumbnail';
import { ActionBar } from '../actionBar/ActionBar';
import { Tab } from './components/Tab';
import { fetchTab } from '../../features/general/asyncThunks/categoryAsyncThunk';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHardcodedLook } from '../../features/general/asyncThunks/hardcodedLookAsyncThunks';
import { fetchFloor } from '../../features/general/asyncThunks/floorAsyncThunk';
import { fetchRug } from '../../features/general/asyncThunks/rugAsyncThunk';
import { fetchIpAddress } from '../../features/ipAddress/ipAsyncThunk';
import { Storage } from '../../features/general/services/storage.service.ts';
import {
  updateHardcodedLooks,
  updateSelectedFloor,
  updateSelectedLook,
  updateSelectedName,
  updateSelectedWall,
} from '../../features/general/generalSlice.ts';

export const CategorySlider: FC = () => {
  const [openSubCategory, setOpenSubCategory] = useState<boolean>(false);
  // const [page] = useState<number>(1);
  // const [count] = useState<number>(10);
  const { tab, isLoading} = useAppSelector(state => state.general);
  const { ip } = useAppSelector(state => state.ipAddress);

  const dispatch = useAppDispatch();
  const sessionId = nanoid();
  const url =
    import.meta.env.MODE === 'development'
      ? 'http://localhost:5173'
      : `${import.meta.env.VITE_HOST_URL}`;

  const isReceivedData = useRef<boolean>(false);
  
  useEffect(() => {
    if (!isReceivedData.current) {
      // const queryData = { page, count };
      !ip && dispatch(fetchIpAddress());

      dispatch(fetchTab());
      
      const savedData = Storage.get_saved_data();
      if (!savedData?.look) {
        dispatch(fetchHardcodedLook());
        dispatch(fetchFloor({}));
        dispatch(fetchRug({}));
      } else {
        dispatch(updateHardcodedLooks(savedData.look));
        dispatch(updateSelectedLook(savedData.selected.selectedLook));
        dispatch(updateSelectedFloor(savedData.selected.selectedFloor));
        dispatch(updateSelectedWall(savedData.selected.selectedWall));
        dispatch(updateSelectedName(savedData.selected.selectedName || ''));
      }

      if (!JSON.parse(sessionStorage.getItem('SessionID') as string)) {
        sessionStorage.setItem('SessionID', JSON.stringify(sessionId));
      }
      isReceivedData.current = true;
    }
  }, [dispatch, ip, sessionId]);

  useEffect(() => {
    history.pushState('Your Page Title', url);

    const handlePopstate = () => {
      if (
        window.confirm(
          'Are you sure you want to leave this page and lose your progress?',
        )
      ) {
        window.open('about:blank', '_self');
        window.close();
      }
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  }, [url]);

  return (
    <>
      <nav
        className={`relative flex h-14 w-full   
        ${
          isLoading
            ? 'pointer-events-none opacity-50'
            : 'pointer-events-auto opacity-100'
        }
      `}
      >
        <div
          className={`
          no-scrollbar
          flex 
          h-14
          w-full 
          overflow-x-scroll 
          text-lg
          font-normal
        `}
        >
          {!!tab.length &&
            tab.map(({ id, name, subcategories }) => {
              return (
                <Tab
                  key={`${id}`}
                  id={id}
                  name={name}
                  subcategories={subcategories}
                  openSubCategory={openSubCategory}
                  setOpenSubCategory={setOpenSubCategory}
                />
              );
            })}
        </div>
      </nav>
      <CategoryThumbnail openSubCategory={openSubCategory} />
      <ActionBar />
    </>
  );
};
