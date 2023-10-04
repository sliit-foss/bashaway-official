import { RxQuestionMark } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import { SectionBadge } from '@/components/common/badges';
import sponsors from './data.json';

const Sponsors = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="sponsors">Sponsors</SectionBadge>
      <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-4 gap-8">
        {sponsors.map((sponsor) => {
          return (
            <div
              key={sponsor.name}
              className={twMerge(
                'relative bg-white w-full aspect-square flex flex-col items-center justify-center rounded-2xl xxs:rounded-3xl after:rounded-2xl xxs:after:rounded-3xl p-6 text-white animated-border from-black to-white',
                sponsor.styles?.wrapper
              )}>
              <div className="w-full h-full flex justify-center items-center transform -translate-y-6">
                {sponsor.logo ? (
                  <img src={sponsor.logo} className={sponsor.styles?.logo} />
                ) : (
                  <RxQuestionMark className="h-full w-7/12 text-black" strokeWidth={0} />
                )}
              </div>
              <div
                className={twMerge(
                  'absolute bottom-6 xl:bottom-10 mx-auto w-1/2 h-9 xxs:h-6 xs:h-7 lg:h-8 xl:h-10 rounded-full bg-black flex justify-center items-center text-sm xsm:text-base md:text-lg font-semibold uppercase',
                  sponsor.styles?.category
                )}>
                {sponsor.category ?? '????'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sponsors;
