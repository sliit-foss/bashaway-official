import { default as FastMarquee } from 'react-fast-marquee';
import { Bashaway } from '@/icons';

const Marquee = () => {
  return (
    <FastMarquee className="bg-black h-[46px] text-xl sm:text-[22px] text-white font-consolas absolute bottom-0 left-0">
      <div className="flex gap-x-12 items-center">
        {Array(3)
          .fill(0)
          .map((_, index) => (
            <div key={index}>
              <span>Inter University Scripting and Automation Competition</span>
              <Bashaway className="translate-y-0.5" dark />
            </div>
          ))}
      </div>
    </FastMarquee>
  );
};

export default Marquee;
