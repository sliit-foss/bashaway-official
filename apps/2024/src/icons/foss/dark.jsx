import { twMerge } from 'tailwind-merge';

const FossDark = ({ className, ...props }) => {
  return (
    <img
      src="./assets/images/logos/foss-dark.png"
      alt="FOSS Logo"
      className={twMerge('w-[123px] h-[73px]', className)}
      {...props}
    />
  );
};

export default FossDark;
