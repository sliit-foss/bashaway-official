import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from '@/components/common';
import { Landing } from '@/pages';

const App = () => {
  const location = useLocation();
  return (
    <main className="min-h-screen mx-auto bg-background">
      <Header />
      <Routes location={location}>
        <Route path="/" element={<Landing />} />
      </Routes>
      <Footer />
    </main>
  );
};

export default App;
