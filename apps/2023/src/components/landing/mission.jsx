import { SectionBadge } from '../common/badges';

const Mission = () => {
  return (
    <div className="w-full flex flex-col mt-12 py-6 px-8 lg:px-24 gap-y-10">
      <SectionBadge>Our Mission</SectionBadge>
      <span className="text-5xl sm:text-6xl md:text-8xl 2xl:text-9xl font-cabinet font-black max-w-[75vw] block tracking-[1.28px]">
        MAKING <br />
        A PLACE OF <br />
        INSPIRATION AND <br />
        INNOVATION FOR <br />
        EVERYONE* <br />
      </span>
    </div>
  );
};

export default Mission;
