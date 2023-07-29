import { default as FastMarquee } from 'react-fast-marquee';
import { Bashaway, Link } from '@/icons';

const PastEvents = () => {
  const handleClickYear = () => window.open(`/2022`, '_blank');

  return (
    <FastMarquee className="bg-black text-xl sm:text-[22px] text-white font-consolas my-6">
      <div className="flex gap-x-7 items-center mt-3 mb-2 mr-7">
        {Array(3)
          .fill(0)
          .map(() => (
            <>
              <div className="flex items-baseline gap-2 cursor-pointer" onClick={handleClickYear}>
                <span className="text-3xl sm:text-4xl font-light font-cabinet uppercase tracking-tight">
                  Bashaway 2022
                </span>
                <Link className="h-6 sm:h-7" />
              </div>
              <Bashaway className="translate-y-0.5 mb-1 sm:mb-2 h-4 sm:h-5" dark />
            </>
          ))}
      </div>
    </FastMarquee>
  );
};

export default PastEvents;
