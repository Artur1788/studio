import { useEffect, useState } from 'react';

export const useOrientation = (): boolean => {
  const [type, setType] = useState<boolean>(
    window.matchMedia('(orientation: portrait)').matches,
  );

  const checkOrientation = (e: MediaQueryListEvent) => {
    const match = e.matches;

    setType(match);
  };

  useEffect(() => {
    window
      .matchMedia('(orientation: portrait)')
      .addEventListener('change', checkOrientation);

    return () => {
      window
        .matchMedia('(orientation: portrait)')
        .removeEventListener('change', checkOrientation);
    };
  }, [type]);

  return type;
};
