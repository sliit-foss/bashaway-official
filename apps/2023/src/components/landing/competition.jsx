import { HighlightText, SectionBadge } from '@/components/common';

const Competition = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="competition">The Competition</SectionBadge>
      <HighlightText className="flex flex-col gap-y-10 max-w-full lg:max-w-[45vw]">
        <span>
          Bashaway is unique in every sense. Any doubts? Do check our pages for cherished memories of the previous
          competition. From organizing workshops to crowning the winning team, it was all unique.
        </span>
        <span>
          Hence why not join the battle this time? Seize the occasion to learn, create and grow! It&apos;s high time to
          leave your trace behind.
        </span>
      </HighlightText>
    </div>
  );
};

export default Competition;
