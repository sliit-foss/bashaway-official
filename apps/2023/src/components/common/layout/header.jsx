import { useState } from 'react';
import { RxCross1, RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { eventPortalLink } from '@/constants';
import { useBreakpoint } from '@/hooks';
import { Bashaway, FOSS, Times } from '@/icons';
import { Button } from '..';

const sections = ['Competition', 'Timeline', 'Rules', 'Prizes', 'Sponsors'];

const mobileNavIconStyles =
  'block xl:hidden absolute right-8 lg:right-24 h-[1.65rem] w-[1.65rem] cursor-pointer hover:text-black/70 transition-all duration-medium';

const Header = ({ className }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

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
        `w-full min-h-[70px] xs:min-h-[90px] backdrop-blur-md fixed z-[200] transition-all duration-long`,
        className,
        mobileNavOpen && !breakpoints['xl'] ? 'h-screen bg-white' : 'h-[70px] xs:h-[90px] bg-white/90'
      )}>
      <div className="w-full max-w-body mx-auto flex justify-between py-3.5 xs:py-6 px-8 lg:px-24">
        <div
          className={twMerge(
            'grid place-content-start grid-flow-col items-center space-x-[20px] sm:space-x-[30px] transition-all duration-medium',
            mobileNavOpen && !breakpoints['xl'] ? 'opacity-0' : 'opacity-100 pointer-events-none'
          )}>
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Home"
            className="hidden xsm:block ">
            <Bashaway width={160} className="w-[160px] sm:w-[185px]" />
          </Link>
          <Times height="15px" width="15px" className="hidden xsm:block opacity-20" />
          <FOSS className="transform scale-[0.85] -translate-x-1" />
        </div>
        <div className={twMerge('absolute inset-0 xl:relative')}>
          <div className="w-full min-h-[70px] xs:min-h-[90px] xl:!min-h-0 flex justify-end items-center px-8 lg:px-24 relative z-50">
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
            <Button
              to={eventPortalLink}
              disabled
              target="_blank"
              className="mt-1.5 xl:mt-0 px-8 xl:px-[1.15rem] pb-2.5 xl:pb-[0.4rem] opacity-30 cursor-not-allowed">
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
