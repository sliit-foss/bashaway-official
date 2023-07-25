import 'aos/dist/aos.css';
import { createContext, useEffect, useState } from 'react';
import { default as Aos } from 'aos';
import { Competition, Landing, Prizes, Register, Rules, Speakers, Timeline } from './components';
import { Footer, Header, Layout } from './components/common';
import { Social } from './components/social';

export const RegistrationOpenContext = createContext({});

function App() {
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    Aos.init({ offset: 0, duration: 1500 });
    window.addEventListener('load', Aos.refresh);
    if (window.location.href.includes('#rules')) {
      document.getElementById('rules').scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <Layout>
        <RegistrationOpenContext.Provider value={{ registration, setRegistration }}>
          <Header />
          <Landing />
          <Timeline />
          <Competition />
          <Rules />
          <Prizes />
          <Speakers />
          <Register />
          <Footer />
        </RegistrationOpenContext.Provider>
      </Layout>
      <Social />
    </>
  );
}

export default App;
