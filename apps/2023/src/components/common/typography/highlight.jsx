import { twMerge } from 'tailwind-merge';

const HighlightText = ({ children, className, ...props }) => {
  return (
    <span
      className={twMerge(
        'text-[25px] sm:text-[28px] lg:text-[32px] text-center lg:text-start font-consolas tracking-[-2px]',
        className
      )}
      {...props}>
      {children}
    </span>
  );
};

export default HighlightText;
