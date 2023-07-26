import { Competition, Hero, Prizes, Register, Rules, Social, Speakers, Timeline } from '@/components';
import { Footer, Header, Layout } from '@/components/common';
import { createContext, useState } from 'react';

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
      <Social />
    </>
  );
};

export default Landing;