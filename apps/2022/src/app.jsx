import { Landing } from '@/pages';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { default as Aos } from 'aos';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    Aos.init({ offset: 0, duration: 1500 });
    window.addEventListener('load', Aos.refresh);
    if (window.location.href.includes('#rules')) {
      document.getElementById('rules').scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <Routes location={location}>
      <Route path="/" element={<Landing />} />
    </Routes>
  );
};

export default App;
