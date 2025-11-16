import { RxQuestionMark } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import { SectionBadge } from '@/components/common/badges';
import { sponsors } from './data';

const Sponsors = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="partners">Partners</SectionBadge>
      <div className="grid grid-cols-1 xxs:grid-cols-2 md:grid-cols-4 gap-8">
        {sponsors.map((sponsor) => {
          const Logo = sponsor.logo;
          return (
            <div
              key={sponsor.name}
              className={twMerge(
                'relative bg-white w-full aspect-square flex flex-col items-center justify-center rounded-2xl xxs:rounded-3xl after:rounded-2xl xxs:after:rounded-3xl p-6 text-white animated-border from-black to-white',
                sponsor.styles?.wrapper
              )}>
              {sponsor.link && (
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`Visit ${sponsor.name}`}
                />
              )}
              <div className="w-full flex justify-center items-center transform -translate-y-6">
                {Logo ? (
                  typeof Logo === 'string' ? (
                    <img src={Logo} alt={sponsor.name} className={sponsor.styles?.logo} />
                  ) : (
                    <Logo className={sponsor.styles?.logo} />
                  )
                ) : (
                  <RxQuestionMark className="h-full w-7/12 text-black" strokeWidth={0} />
                )}
              </div>
              <div
                className={twMerge(
                  'absolute bottom-6 xxs:bottom-5 xs:bottom-6 xl:bottom-10 mx-auto px-4 lg:px-5 xl:px-6 h-9 xxs:h-6 xs:h-7 min-[680px]:max-[768px]:h-8 lg:h-8 xl:h-10 2xl:h-11 rounded-full bg-black flex justify-center items-center text-[12px] xs:text-sm xsm:text-base md:text-lg font-semibold uppercase',
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
