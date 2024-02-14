import { useCallback, useState, SyntheticEvent } from 'react';

interface LongPressHandlers {
  onTouchStart: (event: SyntheticEvent) => void;
  onTouchEnd: (event: SyntheticEvent) => void;
}

const useLongPress = (
  onLongPress: (event: SyntheticEvent) => void,
): LongPressHandlers => {
  const [longPressTriggered, setLongPressTriggered] = useState(false);

  const start = useCallback(
    (event: SyntheticEvent) => {
      setLongPressTriggered(false);

      const touchEndListener = () => {
        document.removeEventListener('touchend', touchEndListener);

        if (!longPressTriggered) {
          onLongPress(event);
          setLongPressTriggered(true);
        }
      };

      document.addEventListener('touchend', touchEndListener);
    },
    [onLongPress, longPressTriggered]
  );

  return {
    onTouchStart: (e: SyntheticEvent) => start(e),
    onTouchEnd: () => {},
  };
};

export default useLongPress;