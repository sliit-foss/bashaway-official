import { useEffect, useState } from 'react';
import defaultTheme from 'tailwindcss/defaultTheme';
import tailwindConfig from '../../tailwind.config.js';

const screens = { ...defaultTheme.screens, ...tailwindConfig.theme.extend.screens };

const calculateBreakpoints = () =>
  Object.entries(screens).reduce((acc, [key, value]) => {
    acc[key] = window.matchMedia(`(min-width: ${value})`).matches;
    return acc;
  }, {});

const useBreakpoint = () => {
  const [breakpoints, setBreakpoints] = useState(calculateBreakpoints());
  useEffect(() => {
    const resizeHandler = () => {
      setBreakpoints(calculateBreakpoints());
    };
    window.addEventListener('resize', resizeHandler);
    return () => window.removeEventListener('resize', resizeHandler);
  }, []);
  return breakpoints;
};

export default useBreakpoint;
