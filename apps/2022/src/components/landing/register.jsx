import { Divider } from '@/components/common';
import { RegistrationOpenContext } from '@/pages/landing';
import { useContext, useEffect } from 'react';
import { default as Countdown } from 'react-countdown';

const openingDate = new Date(2022, 8, 15, 19, 0, 0).getTime();
const closingDate = new Date(2022, 8, 30, 8, 0, 0).getTime();

const Register = ({ showDivider = true, comingSoon }) => {
  const { registration, setRegistration } = useContext(RegistrationOpenContext);

  useEffect(() => {
    if (Date.now() >= openingDate && Date.now() <= closingDate) {
      setRegistration(true);
    }
  }, [registration]);

  const Completionist = ({ text, disabled }) => {
    return (
      <>
        {showDivider && <Divider />}
        <a
          href="https://portal.bashaway.sliitfoss.org/register"
          target="_blank"
          className={disabled ? 'pointer-events-none' : ''}
          rel="noreferrer">
          <div className="flex justify-center bg-gradient-to-r from-transparent via-bg-black/40 to-bg-black/40  backdrop-blur-sm p-4 md:p-7 cursor-pointer hover:bg-[#01050a83] transition duration-300">
            <span
              data-heading={text}
              className={`light-sweep font-extrabold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r ${
                disabled ? 'from-gray-400 via-gray-200 to-gray-400' : 'from-primary to-secondary'
              } px-2 p-4 transform`}>
              {text}
            </span>
          </div>
        </a>
        <Divider />
      </>
    );
  };

  const renderer = ({ days, hours, minutes, seconds }) => {
    if (Date.now() >= closingDate) {
      return <Completionist text="Registration Closed" disabled={true} />;
    } else if (registration) {
      return <Completionist text="Register Now" />;
    } else {
      return (
        <>
          {comingSoon ? (
            <div className="flex justify-center transform scale-75 sm:scale-100">
              <div className="flex flex-col p-1 md:p-4 ">
                <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
                  {days.toString().length == 1 ? '0' + days : days}
                </span>
                <div>
                  <p className="font-poppins text-white text-sm text-center font-light uppercase">Days</p>
                </div>
              </div>
              <div className="flex flex-col p-1  md:p-4">
                <span className="light-sweep font-bold font-poppins text-center  text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
                  {hours.toString().length == 1 ? '0' + hours : hours}
                </span>
                <div>
                  <p className="font-poppins text-white text-sm text-center font-light uppercase">Hours</p>
                </div>
              </div>
              <div className="flex flex-col p-1  md:p-4">
                <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
                  {minutes.toString().length == 1 ? '0' + minutes : minutes}
                </span>
                <div>
                  <p className="font-poppins text-white text-sm text-center font-light uppercase">Minutes</p>
                </div>
              </div>
              <div className="flex flex-col p-1  md:p-4">
                <span className="light-sweep font-bold font-poppins text-center text-transparent text-5xl md:text-7xl bg-clip-text bg-gradient-to-r from-primary to-secondary p-4 transform">
                  {seconds.toString().length == 1 ? '0' + seconds : seconds}
                </span>
                <div>
                  <p className="font-poppins text-white text-sm text-center font-light uppercase">Seconds</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Divider />
              <Completionist text="Coming Soon" />
              <Divider />
            </>
          )}
        </>
      );
    }
  };

  return (
    <header>
      <Countdown
        date={openingDate}
        renderer={renderer}
        onComplete={() => {
          setRegistration(true);
        }}
      />
    </header>
  );
};

export default Register;
