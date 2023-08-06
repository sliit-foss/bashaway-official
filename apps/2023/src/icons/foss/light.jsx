import { twMerge } from 'tailwind-merge';

const FossLight = ({ className, ...props }) => {
  return (
    <img
      src="./assets/images/logos/foss-light.png"
      alt="FOSS Logo"
      className={twMerge('w-[74px] h-[42px]', className)}
      {...props}
    />
  );
};

export default FossLight;
