import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        'group flex justify-center items-center rounded-3xl px-[1.15rem] py-[0.4rem] bg-black text-white font-semibold outline-none transition-all duration-medium',
        className,
        props?.disabled ? 'cursor-not-allowed' : 'cursor-pointer  splash'
      )}
      {...props}>
      {children}
    </button>
  );
};

const ButtonWrapper = ({ to, wrapperClassName, target = '_self', ariaLabel, ...props }) => {
  if (to) {
    return (
      <Link
        to={to}
        target={target}
        className={twMerge(wrapperClassName, props?.disabled ? 'opacity-60 cursor-not-allowed' : '')}
        aria-label={ariaLabel}>
        <Button {...props} />
      </Link>
    );
  }
  return <Button {...props} />;
};

export default ButtonWrapper;
