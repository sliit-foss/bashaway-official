import { createContext, useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { Header, Footer, Layout } from "./components/common";
import {
  Register,
  Sponsors,
  Speakers,
  Prizes,
  Rules,
  Timeline,
  Competition,
  Landing,
} from "./components";

export const registrationOpenContext = createContext({});

function App() {
  const [registration, setRegistration] = useState(false);

  useEffect(() => {
    Aos.init({ offset: 0, duration: 1500 });
    window.addEventListener("load", Aos.refresh);
  }, []);

  return (
    <Layout>
      <registrationOpenContext.Provider
        value={{ registration, setRegistration }}
      >
        <Header />
        <Landing />
        <Timeline />
        <Competition />
        <Rules />
        <Prizes />
        <Speakers />
        <Sponsors />
        <Register />
        <Footer />
      </registrationOpenContext.Provider>
    </Layout>
  );
}

export default App;
