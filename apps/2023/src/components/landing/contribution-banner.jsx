import { Button, SectionBadge } from '@/components/common';
import { githubOrgLink, sliitFossMainWebsite } from '@/constants';

const ContributionBanner = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge>Message From Us</SectionBadge>
      <div className="flex flex-col-reverse md:flex-row bg-black px-10 py-12 lg:px-16 lg:py-16 mb-4 rounded-3xl">
        <div className="w-full flex flex-col text-white gap-y-10">
          <span className="text-[42px] sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl text-center lg:text-start font-cabinet font-extrabold max-w-full lg:max-w-[75vw] block tracking-[1.28px]">
            WANNA <br /> GO BEYOND?
          </span>
          <span className="text-[24px] text-center lg:text-start font-consolas max-w-full lg:max-w-[75vw] block tracking-[1.28px]">
            Make an impact to the community. <br /> Join us with the force of open source.
          </span>
          <div className="w-full flex gap-5 mt-2 justify-center lg:justify-start items-center flex-wrap sm:flex-nowrap">
            <Button
              to={githubOrgLink}
              target="_blank"
              wrapperClassName="w-full sm:w-auto"
              className="w-full bg-white text-black">
              Contribute
            </Button>
            <Button
              to={sliitFossMainWebsite}
              target="_blank"
              wrapperClassName="w-full sm:w-auto"
              className="w-full bg-white text-black">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionBanner;
