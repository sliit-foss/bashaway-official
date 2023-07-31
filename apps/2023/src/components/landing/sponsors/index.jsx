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
              <svg viewBox="0 0 132 46" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10/12 md:w-8/12">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M131.829 0L35.4206 40.8954C27.3939 44.3009 20.6414 46 15.1999 46C9.07734 46 4.61722 43.8395 1.87817 39.5259C-1.67381 33.9599 -0.121195 25.0103 5.9721 15.5628C9.59 10.0408 14.1893 4.97278 18.6714 0.124504C17.6167 1.83824 8.30836 17.3278 18.4883 24.6222C20.5023 26.0869 23.3658 26.8046 26.8885 26.8046C29.7155 26.8046 32.9598 26.3433 36.5265 25.4132L131.829 0Z"
                  fill="black"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sponsors;
