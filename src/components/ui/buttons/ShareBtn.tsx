import { ButtonHTMLAttributes, FC } from 'react';

interface ShareBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export const ShareBtn: FC<ShareBtnProps> = ({ label, ...rest }) => {
  return (
    <button
      {...rest}
      className='
        absolute 
        right-3
        top-3
        z-10
        rounded-[16px]
        bg-[#59D07F]
        px-3
        py-1.5
        text-base
        font-bold
        capitalize
        italic
        text-white'
    >
      {label}
    </button>
  );
};
