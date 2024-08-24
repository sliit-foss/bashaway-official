import { HighlightText, SectionBadge } from '@/components/common';
import { currentYear } from '@/constants/status';

const Competition = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="competition">The Competition</SectionBadge>
      <HighlightText className="flex flex-col gap-y-10 max-w-full lg:max-w-[45vw]">
        <span>
          A unique competition that keeps the coders around the island on their toes. Welcome to ./bashaway{' '}
          {currentYear}, the second edition of the first-ever scripting and automation competition!
        </span>
        <span>
          Join the battle once again. Seize the occasion to learn, create and grow! It&apos;s high time to leave your
          trace behind.
        </span>
      </HighlightText>
    </div>
  );
};

export default Competition;
