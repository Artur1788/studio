import { FC } from 'react';

import { SubTab } from '../../../mockData/mock_tab_data';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  updateSelectedTab,
  addSubTab,
  changeActionBarIndex,
} from '../../../features/general/generalSlice';
import { fetchDecor } from '../../../features/general/asyncThunks/decorAsyncThunk';
import { TabData } from '../../../features/general/general.types';

interface TabsProps {
  id: number;
  name: string;
  subcategories: SubTab[] | null;
  openSubCategory: boolean;
  setOpenSubCategory: React.Dispatch<React.SetStateAction<boolean>>;
}
export const Tab: FC<TabsProps> = ({
  id,
  name,
  subcategories,
  openSubCategory,
  setOpenSubCategory,
}) => {
  const { selected, actionBar, disableTab } = useAppSelector(
    state => state.general,
  );
  const general = useAppSelector(state => state.general);
  const { isLoading } = useAppSelector(state => state.general);
  const dispatch = useAppDispatch();

  const nameExists = disableTab[name];

  const changeTab = () => {
    if (!nameExists && isLoading) return;

    dispatch(updateSelectedTab(name as TabData));

    if (actionBar.includes(name)) {
      name !== 'LOOKS' && dispatch(changeActionBarIndex(name));
    }

    const typeDecor = {
      PLANTS: 'plant',
      LIGHTING: 'lighting',
      'ROOM DECOR': 'roomDecor',
      'WALL DECOR': 'wallDecor',
    } as const;

    const decorTab = typeDecor[name as keyof typeof typeDecor];
    // const queryData = { page, count, decorTab };

    decorTab &&
      !general?.[decorTab]?.data?.length &&
      dispatch(fetchDecor({decorTab}));

    //when subTab will be ready open comment above and remove from here
    !!subcategories?.length && handleSubCategory;
  };

  const handleSubCategory = () => {
    subcategories?.length && dispatch(addSubTab(subcategories));

    setOpenSubCategory(!openSubCategory);
  };

  return selected.selectedTab === name ? (
    <div
      key={id}
      className={`
      flex 
      w-[35%]
      shrink-0 
      grow-0 
      items-center 
      justify-center
    bg-white
      font-semibold 
    text-black    
    ${
      isLoading
        ? 'pointer-events-none opacity-50'
        : 'pointer-events-auto opacity-100'
    }
    ${!nameExists && 'hidden'}
 `}
      onClick={changeTab}
    >
      {name}
      {/* {!!subcategories?.length &&
        (openSubCategory ? (
          <Up
            className='ml-2'
            onClick={handleSubCategory}
          />
        ) : (
          <Down
            className='ml-2'
            onClick={handleSubCategory}
          />
        ))} */}
    </div>
  ) : (
    <div
      key={id}
      className={`
      flex  
      w-[35%] 
      shrink-0
      grow-0 
      items-center 
      justify-center 
    bg-[#E7E7E7]
      font-normal
    text-[rgba(0,0,0,0.40)]
    ${
      isLoading
        ? 'pointer-events-none opacity-50'
        : 'pointer-events-auto opacity-100'
    }
    ${!nameExists && 'hidden'}
      `}
      onClick={changeTab}
    >
      {name}
    </div>
  );
};
