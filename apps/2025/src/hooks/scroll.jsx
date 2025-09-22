import { useLayoutEffect } from 'react';

const useScroll = () => {
  useLayoutEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash) {
      window.scrollTo({
        top: (document.getElementById(hash)?.offsetTop ?? 0) - 138
      });
    }
  });
};

export default useScroll;
