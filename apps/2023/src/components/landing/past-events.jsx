import { Fragment } from 'react';
import { default as FastMarquee } from 'react-fast-marquee';
import { Bashaway, Link as LinkIcon } from '@/icons';

const PastEvents = () => {
  return (
    <div className="pt-6 pb-16">
      <FastMarquee className="bg-black text-xl sm:text-[22px] text-white font-consolas absolute left-0 right-0">
        <div className="flex gap-x-7 items-center mt-3 mb-2 mr-7">
          {Array(10)
            .fill(0)
            .map((_, index) => (
              <Fragment key={index}>
                <a className="flex items-baseline gap-2 cursor-pointer" href="/2022" target="_blank">
                  <span className="text-3xl sm:text-4xl font-light font-cabinet uppercase tracking-tight">
                    Bashaway 2022
                  </span>
                  <LinkIcon className="h-6 sm:h-7" />
                </a>
                <Bashaway className="translate-y-0.5 mb-1 sm:mb-2 h-4 sm:h-5" dark />
              </Fragment>
            ))}
        </div>
      </FastMarquee>
    </div>
  );
};

export default PastEvents;
