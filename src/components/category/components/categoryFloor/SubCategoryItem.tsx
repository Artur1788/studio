import { FC } from 'react';

import { useAppSelector } from '../../../../app/hooks';

export const SubCategoryItem: FC = () => {
  const { subTab } = useAppSelector(state => state.general);
  // const handleChangeSub = (id: number) => {
  //   setSelectedSubCategory(id);
  // };

  return (
    !!subTab?.length &&
    subTab.map(({ name }, index) => (
      <div
        key={index}
        className={`
          flex 
          w-[25%] 
          shrink-0 
          grow-0
          items-center 
          justify-center
         `}
        // onClick={handleChangeSub(id)}
      >
        {name}
      </div>
    ))
  );
};

// ${
//   selectedSubCategory === id
//     ? `text-black`
// :
//   `text-[rgba(0,0,0,0.30)]`
// }
