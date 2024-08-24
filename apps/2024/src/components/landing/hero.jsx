import { BodyText, Button } from '@/components/common';
import { registrationLink } from '@/constants';
import { currentYear, isRegistrationsOpen } from '@/constants/status';
import { Bashaway } from '@/icons';

const Hero = () => {
  return (
    <div className="h-[calc(100vh-70px-46px)] xs:h-[calc(100vh-90px-46px)] flex flex-col justify-center items-center gap-y-8">
      <Bashaway className="w-[280px] sm:w-[400px] h-[58px] sm:h-[78px]" />
      <BodyText className="lg:text-center max-w-5xl px-10 md:px-12">
        A unique competition that keeps the coders around the island on their toes. Welcome to ./bashaway {currentYear},
        the second edition of the first-ever scripting and automation competition in Sri Lanka!
      </BodyText>
      <Button
        to={`${registrationLink}`}
        target="_blank"
        className="mt-2 sm:text-[22px] px-6 py-2 rounded-full tracking-[0.44px]"
        disabled={!isRegistrationsOpen}>
        {isRegistrationsOpen ? 'Register Now' : 'Registration Closed'}
      </Button>
    </div>
  );
};

export default Hero;
