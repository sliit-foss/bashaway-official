import { eventPortalLink } from '@/constants';
import { Bashaway } from '@/icons';
import { Button } from '../common';

const Hero = () => {
  return (
    <div className="h-[calc(100vh-90px-46px)] flex flex-col justify-center items-center gap-y-8">
      <Bashaway className="w-[280px] sm:w-[400px] h-[58px] sm:h-[78px]" />
      <span className="text-[25px] sm:text-[28px] text-center max-w-4xl px-8 md:px-12 font-consolas">
        A unique competition that keeps the coders around the island on their toes. Welcome to ./bashaway 2023, the
        second edition of the first-ever scripting and automation competition!
      </span>
      <Button to={eventPortalLink} target="_blank" className="mt-2">
        Register Now
      </Button>
    </div>
  );
};

export default Hero;
