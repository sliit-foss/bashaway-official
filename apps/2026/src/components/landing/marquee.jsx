import { Fragment } from 'react';
import { default as FastMarqueeModule } from 'react-fast-marquee';
import { twMerge } from 'tailwind-merge';
import { Bashaway } from '@/icons';

// react-fast-marquee ships CommonJS only; Vite 8 hands an ES module its whole exports object as the default import
const FastMarquee = FastMarqueeModule.default ?? FastMarqueeModule;

const Marquee = () => {
  return (
    <FastMarquee className="bg-black h-[60px] text-xl sm:text-[22px] leading-7 text-white font-consolas z-20 absolute left-0 bottom-0">
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
