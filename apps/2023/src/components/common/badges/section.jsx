import { twMerge } from 'tailwind-merge';

const SectionBadge = ({ children, className, ...props }) => {
  return (
    <div
      className={twMerge(
        `group flex self-start justify-center items-center rounded-3xl px-4 py-[0.4rem] cursor-default
                bg-white text-black text-[22px] tracking-[3.08px] font-bold uppercase transition-all duration-medium`,
        className
      )}
      {...props}>
      {children}
    </div>
  );
};

export default SectionBadge;
