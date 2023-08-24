import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import { ComponentStack, SectionBadge } from '@/components/common';
import { useWindowDimension } from '@/hooks';
import tailwindConfig from '../../../../tailwind.config.js';
import timeline from './data.json';

const timelineHeight = 'h-[780px] md:h-[620px] lg:h-[480px] xl:h-[450px]';

const Timeline = () => {
  const { width: screenWidth } = useWindowDimension();

  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10 ">
      <SectionBadge id="timeline">The Timeline</SectionBadge>
      <div className={twMerge(timelineHeight, 'hidden lg:block')} />
      <ComponentStack
        className={`${timelineHeight} gap-1 flex-col lg:flex-row lg:absolute lg:right-0 lg:mt-24 lg:pl-[6rem] 2xl:pl-[6.4rem]`}
        style={{
          maxWidth: `calc(100vw - ${
            (screenWidth - Number(tailwindConfig.theme.extend.maxWidth.body.replace('px', ''))) / 2
          }px)`
        }}
        itemStyle={({ index, itemHovered }) =>
          `w-full hover:flex-[4_0_0%] xs:hover:flex-[3_0_0%] [&>div>div:nth-child(3)]:opacity-100 [&>div>div:nth-child(3)]:hover:opacity-0 [&>div>span:nth-child(4)]:opacity-0 [&>div>span:nth-child(4)]:hover:opacity-100 ${
            index === 0 && !itemHovered
              ? 'flex-[4_0_0%] xs:flex-[3_0_0%] [&>div>div:nth-child(2)]:opacity-100 [&>div>div:nth-child(3)]:opacity-0 [&>div>span:nth-child(4)]:opacity-100'
              : '[&>div>div:nth-child(2)]:opacity-0 [&>div>div:nth-child(2)]:hover:opacity-100'
          }`
        }>
        {timeline.map((item, index) => (
          <div key={index} className="bg-white flex flex-col justify-between items-start p-8 gap-y-12 relative">
            <span className="text-2xl sm:text-3xl md:text-[32px] lg:text-6xl 2xl:text-7xl text-start font-cabinet font-extrabold max-w-full lg:max-w-[75vw] block tracking-[1.28px] z-30">
              {item.date.split(' ').map((word, index) => (
                <Fragment key={index}>
                  {word}&nbsp;
                  <br className="hidden lg:block" />
                </Fragment>
              ))}
            </span>
            <div className="w-full h-full absolute p-8 top-0 left-0 z-10 flex flex-col justify-center transition-all duration-700">
              <span className="text-lg sm:text-xl md:text-xl lg:text-2xl text-start font-cabinet font-medium text-black/40 lg:mt-20">
                <span className="text-black/80 font-extrabold">{item.title} - </span> {item.description}
              </span>
            </div>
            <div className="w-full h-full absolute top-0 left-0 z-20 flex flex-col justify-between blur-xl transition-all duration-1000">
              <div className="w-full h-full bg-white" />
            </div>
            <span className="text-lg sm:text-xl md:text-2xl text-start font-cabinet font-medium text-black/40 z-30 transition-all duration-700">
              {item.time}
            </span>
          </div>
        ))}
      </ComponentStack>
    </div>
  );
};

export default Timeline;
