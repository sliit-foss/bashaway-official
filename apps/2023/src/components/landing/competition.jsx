import { HighlightText, SectionBadge } from '@/components/common';

const Competition = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge>The Competition</SectionBadge>
      <HighlightText className="flex flex-col gap-y-10 max-w-full lg:max-w-[45vw]">
        <span>
          A unique competition that keeps the coders around the island on their toes. Welcome to ./bashaway 2023, the
          second edition of the first-ever scripting and automation competition!
        </span>
        <span>
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing
          layouts and visual mockups.
        </span>
      </HighlightText>
    </div>
  );
};

export default Competition;
