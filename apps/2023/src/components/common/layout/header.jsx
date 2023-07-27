import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { eventPortalLink } from '@/constants';
import { Bashaway, FossLogoDark, Times } from '@/icons';
import { Button } from '..';

const sections = ['Competition', 'Timeline', 'Rules', 'Prizes', 'Sponsors'];

const Header = ({ className }) => {
  const onNavItemClick = (path) => {
    document.getElementById(path).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className={twMerge(`bg-white flex justify-between py-6 px-8 lg:px-24`, className)}>
      <div className="grid place-content-start grid-flow-col items-center space-x-[20px] sm:space-x-[30px]">
        <Link to="/">
          <Bashaway width={160} className="block sm:hidden" />
          <Bashaway className="hidden sm:block" />
        </Link>
        <Times height="15px" width="15px" className="opacity-20" />
        <FossLogoDark width={54} />
      </div>
      <div className="hidden xl:flex justify-center items-center gap-x-[1.375rem] cursor-pointer font-semibold">
        {sections.map((section, index) => (
          <span
            key={index}
            onClick={() => onNavItemClick(section.toLowerCase())}
            className="hover:text-black/70  transition-all duration-medium">
            {section}
          </span>
        ))}
        <Button to={eventPortalLink}>Register</Button>
      </div>
    </header>
  );
};

export default Header;
