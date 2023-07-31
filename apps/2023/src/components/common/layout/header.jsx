import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { eventPortalLink } from '@/constants';
import { Bashaway, FOSS, Times } from '@/icons';
import { Button } from '..';

const sections = ['Competition', 'Timeline', 'Rules', 'Prizes', 'Sponsors'];

const Header = ({ className }) => {
  const onNavItemClick = (path) => {
    window.scrollTo({
      top: document.getElementById(path).offsetTop - 138,
      behavior: 'smooth'
    });
  };

  return (
    <header
      className={twMerge(`w-full min-h-[70px] xs:min-h-[90px] bg-white/90 backdrop-blur-md fixed z-50`, className)}>
      <div className="w-full max-w-body mx-auto flex justify-between  py-6 px-8 lg:px-24">
        <div className="hidden xs:grid place-content-start grid-flow-col items-center space-x-[20px] sm:space-x-[30px]">
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Bashaway width={160} className="w-[160px] sm:w-[185px]" />
          </Link>
          <Times height="15px" width="15px" className="opacity-20" />
          <FOSS className="transform scale-[0.85] -translate-x-1" />
        </div>
        <div className="hidden xl:flex justify-center items-center gap-x-[1.575rem] cursor-pointer font-semibold">
          {sections.map((section, index) => (
            <span
              key={index}
              onClick={() => onNavItemClick(section.toLowerCase())}
              className="hover:text-black/70  transition-all duration-medium">
              {section}
            </span>
          ))}
          <Button to={eventPortalLink} target="_blank">
            Register
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
