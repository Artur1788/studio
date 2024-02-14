import { FC, ReactNode, useState } from 'react';

import { useTexture } from '@react-three/drei';
import { MeshProps, ThreeEvent } from '@react-three/fiber';
import * as Three from 'three';

import { useAppDispatch } from '../../../app/hooks';
import { setIsLoading } from '../../../features/currentImage/currentImageSlice';

interface CircleProps extends MeshProps {
  children: ReactNode;
  isRotate: boolean;
  originalImage: string;
  afterImage: string;
  isOriginalImage: boolean;
  setIsReversed: React.Dispatch<React.SetStateAction<boolean>>;
  setIsRotate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Circle: FC<CircleProps> = ({
  children,
  isRotate,
  position,
  originalImage,
  afterImage,
  isOriginalImage,
  setIsReversed,
  setIsRotate,
}) => {
  const [screenX, setScreenX] = useState<number>(0);
  const [screenY, setScreenY] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [original, after] = useTexture(
    [originalImage, afterImage],
    ([original, after]) => {
      original.wrapS = Three.RepeatWrapping;
      after.wrapS = Three.RepeatWrapping;
      original.repeat.x = -1;
      after.repeat.x = -1;
      original.colorSpace = 'srgb';
      after.colorSpace = 'srgb';
      dispatch(setIsLoading(null));
    },
  );

  const setPointerPosition = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsReversed(true);
    setScreenX(e.screenX);
    setScreenY(e.screenY);
  };

  const handleRotation = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setIsReversed(false);
    if (screenX === e.screenX && screenY === e.screenY) setIsRotate(!isRotate);
  };

  return (
    <mesh
      dispose={null}
      position={position}
      onPointerDown={setPointerPosition}
      onPointerUp={handleRotation}
    >
      <sphereGeometry
        args={[6, 64, 10]}
        attach='geometry'
      />
      <meshBasicMaterial
        attach='material'
        toneMapped={false}
        map={!isOriginalImage ? after : original}
        side={1}
      />
      {children}
    </mesh>
  );
};
