import { RxQuestionMark } from 'react-icons/rx';
import { SectionBadge } from '@/components/common/badges';
import sponsors from './data.json';

const Sponsors = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="sponsors">Sponsors</SectionBadge>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {sponsors.map((sponsor) => {
          return (
            <div
              key={sponsor.name}
              className="bg-white w-full aspect-square flex flex-col items-center justify-center rounded-3xl p-6 text-white animated-border from-black to-white">
              <RxQuestionMark className="h-full w-10/12 md:w-7/12 text-black" strokeWidth={0} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sponsors;
