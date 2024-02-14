import { FC } from 'react';

import { OrbitControls } from '@react-three/drei';

import { useAppSelector } from '../../../app/hooks';

interface ControlsProps {
  isRotate: boolean;
  isReversed: boolean;
}

export const Controls: FC<ControlsProps> = ({
  isRotate = true,
  isReversed,
}) => {
  const isLoading = useAppSelector(state => state.current.isLoading);

  const enableRotate = !isLoading && isRotate;

  return (
    <OrbitControls
      enableDamping
      enableZoom={false}
      autoRotate={enableRotate}
      autoRotateSpeed={0.5}
      rotateSpeed={0.5}
      reverseOrbit={isReversed}
    />
  );
};
