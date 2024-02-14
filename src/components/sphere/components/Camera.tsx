import { PerspectiveCamera } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { FC, RefObject, useEffect, useRef, useState } from 'react';
import * as Three from 'three';

interface CameraProps {
  sphereWrapperRef: RefObject<HTMLDivElement>;
  cameraRef: RefObject<Three.PerspectiveCamera>;
  cameraPosition: [number, number, number];
}

export const Camera: FC<CameraProps> = ({
  sphereWrapperRef,
  cameraPosition,
  cameraRef,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const firstTouchX = useRef<number>(0);
  const secondTouchX = useRef<number>(0);
  // useFrame(() => {
  //   if (cameraRef.current) {
  //     console.log(cameraRef.current.position.x, 'x');
  //   }
  // });

  useEffect(() => {
    //TODO:
    // function cameraZoomOnWheel(event: WheelEvent) {
    //   if (cameraRef.current) {
    //     const fov = cameraRef.current.fov + event.deltaY * 0.05;

    //     cameraRef.current.fov = Three.MathUtils.clamp(fov, 10, 75);

    //     cameraRef.current.updateProjectionMatrix();
    //   }
    // }

    function touchStartHandler(e: TouchEvent) {
      if (e.targetTouches.length === 2) {
        firstTouchX.current = e.targetTouches[0]?.clientX;
        secondTouchX.current = e.targetTouches[1]?.clientX;
      }
    }

    function touchMoveHandler(e: TouchEvent) {
      if (e.targetTouches.length === 2) {
        const diff = Math.abs(
          e.targetTouches[0]?.clientX - e.targetTouches[1]?.clientX,
        );
        if (Math.abs(firstTouchX.current - secondTouchX.current) > diff) {
          if (zoomLevel < 0.6) return;
          setZoomLevel(prev => prev - 0.1);
        } else {
          if (zoomLevel > 4) return;
          setZoomLevel(prev => prev + 0.1);
        }
      }
    }

    if (sphereWrapperRef.current) {
      sphereWrapperRef.current.addEventListener('touchmove', touchMoveHandler);
      sphereWrapperRef.current.addEventListener(
        'touchstart',
        touchStartHandler,
      );
    }

    const sphereWrapper = sphereWrapperRef.current;

    return () => {
      sphereWrapper?.removeEventListener('touchmove', touchMoveHandler);
      sphereWrapper?.removeEventListener('touchstart', touchStartHandler);
    };
  }, [sphereWrapperRef, zoomLevel]);

  // useEffect(() => {
  //   if (cameraRef.current) {
  //     console.log(cameraPosition);

  //     // cameraRef.current?.position.set(...cameraPosition);
  //     cameraRef.current.position.set(
  //       -5.235716440238878e-8,
  //       -1.0012492197245693,
  //       9.99879356653224e-7,
  //     );
  //   }
  // }, [cameraRef, cameraPosition]);

  return (
    <PerspectiveCamera
      makeDefault
      ref={cameraRef}
      fov={70}
      near={0.01}
      far={100}
      position={cameraPosition}
      zoom={zoomLevel}
    />
  );
};
