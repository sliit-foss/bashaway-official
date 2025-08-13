import { useState } from 'react';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { registrationLink } from '@/constants';
import { TIME_REGISTRATION_CLOSING } from '@/constants/dates';
import { useBreakpoint, useCountdown } from '@/hooks';
import { Bashaway, FOSS, Times } from '@/icons';
import { Button } from '..';

const sections = ['Competition', 'Timeline', 'Rules', 'Prizes', 'Sponsors'];

const mobileNavIconStyles =
  'block xl:hidden absolute right-8 lg:right-24 h-[1.65rem] w-[1.65rem] cursor-pointer hover:text-black/70 transition-all duration-medium';

const Header = ({ className }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const { didCountDownComplete } = useCountdown({ targetDate: TIME_REGISTRATION_CLOSING });
  const breakpoints = useBreakpoint();

  const onNavItemClick = (path) => {
    if (!breakpoints['xl']) setMobileNavOpen(false);
    window.scrollTo({
      top: document.getElementById(path).offsetTop - 138,
      behavior: 'smooth'
    });
  };

  return (
    <header
      className={twMerge(
        `w-full min-h-[70px] backdrop-blur-md sticky top-0 z-[200] transition-all duration-long`,
        className,
        mobileNavOpen && !breakpoints['xl'] ? 'h-screen bg-white' : 'h-[70px] bg-white/90'
      )}>
      <div className="w-full max-w-body mx-auto flex justify-between py-3.5 px-8 lg:px-24">
        <div
          className={twMerge(
            'grid place-content-start grid-flow-col items-center space-x-[20px] transition-all duration-medium',
            mobileNavOpen && !breakpoints['xl'] ? 'opacity-0' : 'opacity-100 pointer-events-none'
          )}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Home"
            className="hidden xsm:block ">
            <Bashaway width={160} className="w-[140px] sm:w-[160px]" />
          </Link>
          <Times height="12px" width="12px" className="hidden xsm:block opacity-20" />
          <FOSS className="transform scale-[0.70] -translate-x-1" />
        </div>
        <div className={twMerge('absolute inset-0 xl:relative')}>
          <div className="w-full min-h-[70px] xl:!min-h-0 flex justify-end items-center px-8 lg:px-24 relative z-50">
            <RxHamburgerMenu
              className={twMerge(mobileNavIconStyles, mobileNavOpen ? 'opacity-0 pointer-events-none' : 'opacity-100')}
              onClick={setMobileNavOpen.bind(this, true)}
            />
            <RxCross1
              className={twMerge(mobileNavIconStyles, mobileNavOpen ? 'opacity-100' : 'opacity-0 pointer-events-none')}
              onClick={setMobileNavOpen.bind(this, false)}
            />
          </div>
          <div
            className={twMerge(
              `h-full xl:bg-transparent xl:h-auto flex flex-col xl:flex-row justify-center items-center gap-[1.575rem] cursor-pointer font-semibold text-2xl xl:text-base`,
              !breakpoints['xl'] ? 'transition-all duration-medium' : '',
              mobileNavOpen && !breakpoints['xl']
                ? 'opacity-100 delay-150 pb-[70px] xs:pb-[90px]'
                : 'opacity-0 pointer-events-none xl:opacity-100 xl:pointer-events-auto'
            )}>
            {sections.map((section, index) => (
              <span
                key={index}
                onClick={() => onNavItemClick(section.toLowerCase())}
                className="hover:text-black/70 transition-all duration-medium">
                {section}
              </span>
            ))}
            <Button to={registrationLink} target="_blank" disabled={didCountDownComplete}>
              {!didCountDownComplete ? 'Register' : 'Registration Closed'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
