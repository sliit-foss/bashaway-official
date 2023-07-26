import { Landing } from '@/pages';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from '@/components/common';

const App = () => {
  const location = useLocation();
  return (
    <>
      <Header />
      <main className="min-h-screen mx-auto bg-white">
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
