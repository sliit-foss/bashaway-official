import { RxQuestionMark } from 'react-icons/rx';
import { twMerge } from 'tailwind-merge';
import { SectionBadge } from '@/components/common/badges';
import { partners } from './data';

const InKindPartners = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge id="knowledge-partners">In-kind Partners</SectionBadge>
      <div className="grid grid-cols-1 xxs:grid-cols-2 sm:grid-cols-4 gap-8">
        {partners.map(({ name, logo: Logo, link, classNames }) => (
          <a
            key={name}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white w-full aspect-square flex flex-col items-center justify-center rounded-3xl p-8 xxs:p-4 xs:p-6 md:p-7 xl:p-12 text-white animated-border from-black to-white">
            {name && Logo ? (
              <Logo className={twMerge('w-full', classNames)} />
            ) : (
              <RxQuestionMark className="h-full w-7/12 text-black" strokeWidth={0} />
            )}
          </a>
        ))}
      </div>
    </div>
  );
};

export default InKindPartners;
