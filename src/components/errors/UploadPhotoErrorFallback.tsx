import { FC } from 'react';

interface UploadPhotoErrorFallbackProps {
  message: string;
}

export const UploadPhotoErrorFallback: FC<UploadPhotoErrorFallbackProps> = ({
  message,
}) => {
  const resetPage = () => {
    window.location.reload();
  };

  return (
    <div
      className='
        flex
        h-[396px]
        w-full
        flex-col
        items-center
        justify-center
        gap-y-4
        '
    >
      <h1 className='font-bold text-red-500'>{message}</h1>
      <h4 className='font-semibold'>Something went wrong...</h4>
      <button
        onClick={resetPage}
        className='
          rounded-xl 
          bg-red-500
          px-5 py-3 
          italic 
          text-neutral-100 
          transition-colors 
          duration-300 
          active:bg-green-600'
      >
        Press to refresh the page
      </button>
    </div>
  );
};
