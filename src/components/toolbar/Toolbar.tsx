import {
  FC,
  MouseEventHandler,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';

import toast from 'react-hot-toast';
import * as Three from 'three';

import After from '../../assets/icons/after.svg';
import Before from '../../assets/icons/before.svg';
import Edit from '../../assets/icons/edit.svg';
import FullScreen from '../../assets/icons/full_screen.svg';
import FullScreenActive from '../../assets/icons/full_screen_active.svg';
import Gyro from '../../assets/icons/gyroscope.svg';
import GyroActive from '../../assets/icons/gyroscope_active.svg';
import Plus from '../../assets/icons/open_navbar.svg';
import { Loading } from '../../features/currentImage/currentImage.types';
import { DeviceOrientationEventIOS } from '../../types';
import { ToolbarModal } from './components/ToolbarModal';

interface ToolBarProps {
  isFullScreen: boolean;
  isPortrait: boolean;
  isSphere: boolean;
  isOriginalImage: boolean;
  isLoading: boolean | Loading;
  isGyroActive: boolean;
  cameraRef: RefObject<Three.PerspectiveCamera>;
  setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOriginalImage: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGyroActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCameraPosition: React.Dispatch<
    React.SetStateAction<[number, number, number]>
  >;
}

export const Toolbar: FC<ToolBarProps> = ({
  isPortrait,
  isFullScreen,
  isSphere,
  isOriginalImage,
  isLoading,
  isGyroActive,
  cameraRef,
  setIsFullScreen,
  setIsOriginalImage,
  setIsGyroActive,
  setCameraPosition,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [modalHeight, setModalHeight] = useState<number | null>(null);
  const [startY, setStartY] = useState<number | null>(null);

  const [hasVisited, setHasVisited] = useState<unknown>(() => {
    return JSON.parse(localStorage.getItem('hasVisited') as '{}') as unknown;
  });

  const timerID = useRef<number | undefined>(undefined);

  const switchFullScreen = () => {
    setIsFullScreen(prevScreenState => !prevScreenState);
  };

  const switchGyroActiveState = async () => {
    if (cameraRef.current) {
      setCameraPosition([
        -5.235716440238878e-8, -1.0012492197245693, 9.99879356653224e-7,
      ]);
    }
    // if (cameraRef.current) {
    // console.log(cameraRef.current.position.x);
    // console.log(cameraRef.current.position.y);
    // console.log(cameraRef.current.position.z);
    // const arr = cameraRef.current.position.toArray();
    // console.log(arr);
    // console.log(cameraRef.current.position.y);
    // console.log(cameraRef.current.position.z);
    // setCameraPosition([
    //   parseFloat(
    //     cameraRef.current.position.x.toPrecision().toString().slice(0, 3),
    //   ),
    //   parseFloat(
    //     cameraRef.current.position.y.toPrecision().toString().slice(0, 3),
    //   ),
    //   parseFloat(
    //     cameraRef.current.position.z.toPrecision().toString().slice(0, 3),
    //   ),
    // ]);
    // if (Math.abs(vector.y) < 0.000001) {
    //   vector.y = 0;
    // }
    // }
    if (isGyroActive && cameraRef.current) {
      setCameraPosition([
        cameraRef.current.position.x,
        cameraRef.current.position.y,
        cameraRef.current.position.z,
      ]);
      setIsGyroActive(false);
      return;
    }

    const requestPermission = (
      DeviceOrientationEvent as unknown as DeviceOrientationEventIOS
    ).requestPermission;
    const ios = typeof requestPermission === 'function';
    if (ios) {
      try {
        const response = await requestPermission();
        if (response === 'granted') {
          setIsGyroActive(prev => !prev);
        }
      } catch {
        toast.error('Your device does not support gyroscope functionality');
      }
    }
  };

  const switchImages: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation();
    setIsOriginalImage(prevImage => !prevImage);
  };

  const handleMessage = () => {
    toast('Coming soon');
  };

  useEffect(() => {
    if (!hasVisited && !isLoading) {
      localStorage.setItem('hasVisited', JSON.stringify(true));

      timerID.current = setTimeout(() => {
        setHasVisited(true);
      }, 5000);
    }
    return () => clearTimeout(timerID.current);
  }, [hasVisited, isLoading]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartY(e.touches[0].clientY);
    const rect = ref.current?.getBoundingClientRect();
    if (rect) setModalHeight(rect.height);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!startY || !ref.current || !modalHeight) return;

    const deltaY = e.touches[0].clientY - startY;
    const newHeight = modalHeight - deltaY;

    if (newHeight > 0) {
      ref.current.style.height = `${newHeight}px`;
    }
  };

  const handleTouchEnd = () => {
    if (!startY || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    if (rect) {
      const deltaY = rect.top;
      if (deltaY > window.innerHeight / 2) {
        setOpen(false);
      }
    }

    ref.current.style.height = '';
    setStartY(null);
  };

  return (
    <nav
      className={`relative flex bg-black
      ${
        !isPortrait && isFullScreen
          ? 'order-1 h-full w-[69px]'
          : 'order-2 h-12 w-full'
      }
      ${
        isLoading
          ? 'pointer-events-none opacity-50'
          : 'pointer-events-auto opacity-100'
      }
      `}
    >
      <div>
        {!isPortrait && isFullScreen ? (
          // toolbar for fullscreen and landscape mode
          <div className='flex h-full w-full flex-col items-center justify-between py-8'>
            <FullScreen onClick={switchFullScreen} />
            {isSphere && (
              <>
                {!isGyroActive ? (
                  <Gyro
                    className='activeColorSvg'
                    onClick={switchGyroActiveState}
                  />
                ) : (
                  <GyroActive
                    className='activeColorSvg'
                    onClick={switchGyroActiveState}
                  />
                )}
              </>
            )}
            <div onClick={switchImages}>
              {!isOriginalImage ? <After /> : <Before />}
            </div>
          </div>
        ) : (
          <div
            className={`
            absolute
            bottom-0
            right-0
            z-30
            flex
            w-full
            justify-end
            rounded-t-[20px]
           bg-black 
           duration-500
            ${open ? `h-[350px]  ` : !isPortrait ? 'h-full' : 'h-12 '}

        `}
            ref={ref}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {!open ? (
              <div
                className='
                flex
                w-full
                items-center
                justify-between
                px-5'
              >
                <div
                  className='
                  flex
                  w-3/12
                  justify-between'
                >
                  <div onClick={switchFullScreen}>
                    {isFullScreen ? (
                      <FullScreenActive className='activeColorSvg' />
                    ) : (
                      <FullScreen className='activeColorSvg' />
                    )}
                  </div>
                  {!isFullScreen && isSphere && (
                    <>
                      {!isGyroActive ? (
                        <Gyro
                          className='activeColorSvg'
                          onClick={switchGyroActiveState}
                        />
                      ) : (
                        <GyroActive onClick={switchGyroActiveState} />
                      )}
                    </>
                  )}
                </div>
                {isFullScreen && isSphere && (
                  <>
                    {!isGyroActive ? (
                      <Gyro
                        className='activeColorSvg'
                        onClick={switchGyroActiveState}
                      />
                    ) : (
                      <GyroActive onClick={switchGyroActiveState} />
                    )}
                  </>
                )}
                {!isFullScreen && (
                  <div
                    className='
                    relative
                    flex
                    flex-col
                    items-center
                    justify-center'
                    onClick={() => setOpen(!open)}
                  >
                    {!hasVisited && !isLoading && (
                      <>
                        <div
                          className='
                          absolute
                          bottom-14
                          rounded-[9px]
                        bg-white
                          drop-shadow-3xl'
                        >
                          <div
                            className='
                            flex
                            h-[42px]
                            w-[160px]
                            items-center
                            justify-center'
                          >
                            <p className='font-sm font-normal'>
                              See in <b>YOUR</b> Space!
                            </p>
                          </div>
                        </div>

                        <div
                          className='
                          clip-style
                          absolute
                          bottom-4
                          flex
                          h-[40px]
                          w-[40px]
                          bg-white'
                        />
                      </>
                    )}
                    <Plus className='activeColorSvg' />
                  </div>
                )}
                <div
                  className={`flex w-3/12 ${
                    isFullScreen ? 'justify-end' : 'justify-between'
                  }`}
                >
                  {!isFullScreen && (
                    <Edit
                      className='activeColorSvg'
                      onClick={handleMessage}
                    />
                  )}
                  <div onClick={switchImages}>
                    {!isOriginalImage ? <After /> : <Before />}
                  </div>
                </div>
              </div>
            ) : (
              <ToolbarModal
                setOpen={setOpen}
                open={open}
              />
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
