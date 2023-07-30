import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import { HighlightText, SectionBadge } from '@/components/common';
import rules from './data.json';

const Rules = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge>The Rules & Regulations</SectionBadge>
      <div className="bg-white p-8 py-10 rounded-3xl flex flex-col items-center lg:items-start">
        {rules.map((rule, index) => {
          return (
            <Fragment key={index}>
              <HighlightText
                className={twMerge(
                  'tracking-[0.32px] leading-[103%] font-medium font-cabinet',
                  index === rules.length - 1 ? 'text-black' : 'text-black/60'
                )}>
                {rule}
              </HighlightText>
              {index === rules.length - 1 ? null : <hr className="w-full border-black/10 my-5" />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Rules;
