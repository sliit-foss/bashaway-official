import { Divider } from "./common";
import Countdown from "react-countdown";
import { registrationOpenContext } from "../App";
import { useContext } from "react";

const Register = ({ showDivider = true }) => {
  const { registration, setRegistration } = useContext(registrationOpenContext);

  const Completionist = () => {
    return (
      <>
        {showDivider && <Divider />}
        <div className="flex justify-center bg-gradient-to-r from-transparent via-bg-black/40 to-bg-black/40  backdrop-blur-sm p-4 md:p-7 cursor-pointer hover:bg-[#01050a83] transition duration-300">
          <span
            data-heading="Register Now"
            className="light-sweep font-extrabold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform"
          >
            Register Now
          </span>
        </div>
        <Divider />
      </>
    );
  };

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      setRegistration(true);
      return <Completionist />;
    } else {
      return (
        <div className="flex justify-center pb-10">
          <div className="flex flex-col p-1  md:p-4 ">
            <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
              {days.toString().length == 1 ? "0" + days : days}
            </span>
            <div>
              <p className="font-poppins text-white text-sm text-center font-light uppercase">
                Days
              </p>
            </div>
          </div>
          <div className="flex flex-col p-1  md:p-4">
            <span className="light-sweep font-bold font-poppins text-center  text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
              {hours.toString().length == 1 ? "0" + hours : hours}
            </span>
            <div>
              <p className="font-poppins text-white text-sm text-center font-light uppercase">
                Hours
              </p>
            </div>
          </div>
          <div className="flex flex-col p-1  md:p-4">
            <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
              {minutes.toString().length == 1 ? "0" + minutes : minutes}
            </span>
            <div>
              <p className="font-poppins text-white text-sm text-center font-light uppercase">
                Minutes
              </p>
            </div>
          </div>
          <div className="flex flex-col p-1  md:p-4">
            <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
              {seconds.toString().length == 1 ? "0" + seconds : seconds}
            </span>
            <div>
              <p className="font-poppins text-white text-sm text-center font-light uppercase">
                Seconds
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <header>
      <Countdown
        date={Date.now() + 3542400000}
        renderer={renderer}
        // onComplete={() => {
        //   setRegistration(true);
        // }}
      />
    </header>
  );
};

export default Register;
