import { ChangeEvent, FC } from 'react';

import Plus from '../../../../assets/icons/plus.svg';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { CategoryLookItem } from './CategoryLookItem';
import { uploadInspirationStyle } from '../../../../features/general/asyncThunks/inspirationStyleAsyncThunk';

export const CategoryLooks: FC = () => {
  const dispatch = useAppDispatch();
  const { look } = useAppSelector(state => state.general);

  const handlerNewInspirationStyle = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    dispatch(uploadInspirationStyle(formData));
  };

  return (
    <div className='my-4 flex gap-x-2'>
      <label
        className='cursor-pointer'
        htmlFor='inspiration-style'
      >
        <div
          className={`
          mt-[3px]
          flex 
          h-[35vmin] 
          shrink-0 
          grow-0
          items-center
          justify-center
          rounded-[12px]
          bg-[#EAEAEA] 
          active:bg-[#59D07F]
          `}
        >
          <input
            onChange={handlerNewInspirationStyle}
            id='inspiration-style'
            type='file'
            className='hidden'
          />
          <Plus
            className={` 
            h-[9vmin] 
            w-[25vmin]
            blankSvgPlus 
          `}
          />
        </div>
      </label>
      {!!look.length &&
        look.map((lookItem, index) => (
          <CategoryLookItem
            lookItem={lookItem}
            key={index}
          />
        ))}
    </div>
  );
};
