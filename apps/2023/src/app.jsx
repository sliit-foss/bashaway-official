import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from '@/components/common';
import { Landing } from '@/pages';

const App = () => {
  const location = useLocation();
  return (
    <div className="w-full bg-background">
      <main className="w-full flex flex-col items-center min-h-screen mx-auto">
        <Header />
        <div className="w-full max-w-body grow mt-[70px] xs:mt-[90px]">
          <Routes location={location}>
            <Route path="/" element={<Landing />} />
          </Routes>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default App;
