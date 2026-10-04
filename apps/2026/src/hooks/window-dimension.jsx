import { useEffect, useState } from 'react';

const useWindowDimension = () => {
  const [dimension, setDimension] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const resizeHandler = () => setDimension([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);

  return { width: dimension[0], height: dimension[1] };
};

export default useWindowDimension;
