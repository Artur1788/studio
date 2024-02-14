import loadImage from 'blueimp-load-image';

export const imageOrientationCorrector = async (
  file: File,
): Promise<Blob | undefined> => {
  return new Promise(resolve => {
    loadImage(
      file,
      (img: unknown) => {
        if (img instanceof HTMLCanvasElement) {
          img.toBlob(blob => {
            resolve(blob!);
          }, 'image/jpeg');
        } else {
          return;
        }
      },
      {
        orientation: true,
        canvas: true,
      },
    );
  });
};
