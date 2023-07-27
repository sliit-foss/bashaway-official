import { Route, Routes, useLocation } from 'react-router-dom';
import { Footer, Header } from '@/components/common';
import { Landing } from '@/pages';

const App = () => {
  const location = useLocation();
  return (
    <main className="flex flex-col min-h-screen mx-auto bg-background">
      <Header />
      <div className="grow">
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
};

export default App;
