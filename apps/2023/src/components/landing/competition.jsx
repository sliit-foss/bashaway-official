import { SectionBadge } from '../common/badges';

const Competition = () => {
  return (
    <div className="w-full flex flex-col mt-12 py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge>The Competition</SectionBadge>
      <div className="flex flex-col gap-y-10 text-[25px] sm:text-[28px] text-center lg:text-start font-consolas max-w-full lg:max-w-[45vw]">
        <span>
          A unique competition that keeps the coders around the island on their toes. Welcome to ./bashaway 2023, the
          second edition of the first-ever scripting and automation competition!
        </span>
        <span>
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing
          layouts and visual mockups.
        </span>
      </div>
    </div>
  );
};

export default Competition;
