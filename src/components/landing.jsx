import Register from "./register";
import NET from "vanta/dist/vanta.net.min";
import { useEffect, useRef, useState, useContext } from "react";
import { RegistrationOpenContext } from "../App";

const Landing = () => {
  const { registration } = useContext(RegistrationOpenContext);
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);

  useEffect(() => {
    document.getElementById("vanta-placeholder").style.display = "none";
  }, []);

  useEffect(() => {
    if (!vantaEffect) {
      const mediaQuery = window.matchMedia("(max-width: 768px)");
      document.getElementById("vanta-placeholder").style.display = "block";
      setVantaEffect(
        NET({
          el: myRef.current,
          color: "#0070F3",
          backgroundColor: "#000000",
          maxDistance: mediaQuery.matches ? 12 : 20,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="w-full flex flex-col justify-center items-center h-screen relative content">
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-x-6 mb-56 sm:mb-36 px-6 relative z-40">
        <div className="w-full md:w-auto flex justify-start md:justify-end">
          <img src="/assets/logo/SLIIT.svg" className="w-30 h-30 mr-5 mt-8" />
          <img src="/assets/logo/Circle.svg" className="w-30 h-30 mr-5 mt-8" />
          <img src="/assets/logo/Line.svg" className="w-30 h-30" />
        </div>
        <img
          src="/assets/logo/bashaway.svg"
          className="w-30 h-30 mt-3 md:mt-0"
        />
        <div className="w-full md:w-auto flex md:inline justify-end md:justify-start">
          <img src="/assets/logo/2022.svg" className="w-30 h-30 mt-4 md:mt-0" />
        </div>
      </div>
      <div className="w-auto bg-logo-container backdrop-blur-md rounded-lg p-2 flex justify-center items-center flex-wrap absolute bottom-32 sm:bottom-36 md:bottom-56 z-40 transform scale-75">
        <a href="https://sliitfoss.org" target="_blank">
          <img src="/assets/foss-logo.svg" className="w-28 h-28 mx-5" />
        </a>
        <a href="https://sliitieee.org" target="_blank">
          <img src="/assets/fcsc-logo.png" className="w-32 h-32 mx-5 mr-3 filter brightness-125" />
        </a>
        <a href="https://community.mozilla.org/en/groups/mozilla-campus-club-of-sliit/" target="_blank">
          <img src="/assets/mozilla-logo.png" className="w-32 h-32 mx-3 filter brightness-115" />
        </a>
        <a href="https://wif-web.web.app" target="_blank">
          <img src="/assets/wif-logo.png" className="w-28 h-[4.2rem] mb-0.5 mx-5" />
        </a>
      </div>
      <div
        id="vanta-placeholder"
        ref={myRef}
        className="w-full h-full bg-black absolute top-0 right-0"
      />
      <div
        className={`w-full absolute bottom-0 z-40 transition duration-300 ${!registration ? 'mb-8' : ''}`}
        id="register"
      >
        <Register showDivider={false} comingSoon={true} />
      </div>
      <div className="w-full h-full bg-gradient-radial from-primary via-[#001630] to-transparent opacity-20 absolute top-0 left-0" />
    </div>
  );
};

export default Landing;
