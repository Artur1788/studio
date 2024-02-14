import { FC, SVGProps } from 'react';

interface TryNowBtnProps {
  label?: string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export const TryFreeBtn: FC<TryNowBtnProps> = ({
  label = 'try free',
  icon: Icon,
}) => {
  return (
    <button
      className={`
      ]
      group
      flex
      items-center
      justify-center
      gap-x-3
      rounded-[32px]
      bg-[rgba(65,65,65,1)]
      py-[21px]
      pl-[21px]
      pr-8
      shadow-[4px_4px_21px_0px_#00000099]
      active:bg-white
active:shadow-[0px_0px_4px_0px_#000000]
    `}
    >
      <Icon />
      <span
        className={`
        text-[21px]
        font-bold
        capitalize
        leading-[26px]
        text-white
        group-active:text-black
      `}
      >
        {label}
      </span>
    </button>
  );
};
