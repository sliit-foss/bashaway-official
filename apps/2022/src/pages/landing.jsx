import { Competition, Hero, Prizes, Register, Rules, Speakers, Timeline } from '@/components';
import { createContext, useState } from 'react';
import { Footer, Header, Layout } from '@/components/common';

export const RegistrationOpenContext = createContext({});

const Landing = () => {
  const [registration, setRegistration] = useState(false);

  return (
    <>
      <Layout>
        <RegistrationOpenContext.Provider value={{ registration, setRegistration }}>
          <Header />
          <Hero />
          <Timeline />
          <Competition />
          <Rules />
          <Prizes />
          <Speakers />
          <Register />
          <Footer />
        </RegistrationOpenContext.Provider>
      </Layout>
    </>
  );
};

export default Landing;
