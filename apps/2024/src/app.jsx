import { Route, Routes, useLocation } from 'react-router-dom';
import { Background, Footer, Header } from '@/components/common';
import { useScroll } from '@/hooks';
import { Landing } from '@/pages';

const App = () => {
  useScroll();
  const location = useLocation();
  return (
    <div className="w-full bg-background">
      <main className="w-full flex flex-col items-center min-h-[100dvh] mx-auto">
        <Header />
        <div className="w-full max-w-body grow cursor-default z-40">
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
        <Footer />
        <Background />
      </main>
    </div>
  );
};

export default App;
