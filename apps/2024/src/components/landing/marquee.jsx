import { Fragment } from 'react';
import { default as FastMarquee } from 'react-fast-marquee';
import { twMerge } from 'tailwind-merge';
import { Bashaway } from '@/icons';

const Marquee = () => {
  return (
    <FastMarquee className="bg-black h-[46px] text-xl sm:text-[22px] text-white font-consolas z-20 sticky bottom-0">
      <div className={twMerge('flex gap-x-12 items-center mr-12')}>
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <Fragment key={index}>
              <span>Inter University Scripting and Automation Competition</span>
              <Bashaway className="translate-y-0.5" dark />
            </Fragment>
          ))}
      </div>
    </FastMarquee>
  );
};

export default Marquee;
