import { useEffect } from 'react';

export const useDocumentHidden = (isHidden: boolean) => {
  useEffect(() => {
    if (isHidden) {
      document.documentElement.setAttribute('class', 'overflow-hidden');
    }

    return () => document.documentElement.removeAttribute('class');
  }, [isHidden]);
};
