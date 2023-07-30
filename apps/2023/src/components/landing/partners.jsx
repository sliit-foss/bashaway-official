import { SectionBadge } from '@/components/common/badges';

const Partners = () => {
  return (
    <div className="w-full flex flex-col items-center mt-12 py-6 px-6 lg:px-24 gap-y-8 md:gap-y-14">
      <SectionBadge className="self-center lg:self-center">In partnership with</SectionBadge>
      <div className="flex justify-center items-center gap-10 md:gap-x-20 transform scale-[0.55] xs:scale-75 md:scale-100">
        <img src="./assets/images/logos/wif.png" className="w-[144px] h-[60px] translate-y-0.5" />
        <img
          src="./assets/images/logos/mozilla.png"
          className="w-[195px] h-[56px] transform -translate-x-0.5 translate-y-1"
        />
        <img src="./assets/images/logos/fcsc.png" className="w-[131px] h-[56px]" />
      </div>
    </div>
  );
};

export default Partners;
