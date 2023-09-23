import { SectionBadge } from '@/components/common/badges';
import { partners } from './data';

const KnowledgePartners = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="knowledge-partners">Knowledge Partners</SectionBadge>
      <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-4 gap-8">
        {partners.map(({ name, logo: Logo }) => (
          <div
            key={name}
            className="bg-white w-full aspect-square flex flex-col items-center justify-center rounded-3xl p-8 xxs:p-4 xs:p-6 md:p-7 xl:p-12 text-white animated-border from-black to-white">
            <Logo className="w-full h-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgePartners;
