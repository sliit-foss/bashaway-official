import { SectionBadge } from '@/components/common/badges';
import { partners } from './data';

const KnowladgePartners = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="sponsors">Knowladge Partners</SectionBadge>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
        {partners.map(({ name, logo: Logo }) => {
          return (
            <div
              key={name}
              className="bg-white w-full aspect-square flex flex-col items-center justify-center rounded-3xl p-6 text-white animated-border from-black to-white">
              <Logo className="w-24 sm:w-40" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KnowladgePartners;
