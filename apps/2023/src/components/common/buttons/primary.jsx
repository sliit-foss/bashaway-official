import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        'group flex justify-center items-center cursor-pointer rounded-3xl px-[1.15rem] py-[0.4rem] bg-black text-white font-semibold outline-none transition-all duration-medium splash',
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

const ButtonWrapper = ({ to, wrapperClassName, target = '_self', ...props }) => {
  if (to) {
    return (
      <Link to={to} target={target} className={wrapperClassName}>
        <Button {...props} />
      </Link>
    );
  }
  return <Button {...props} />;
};

export default ButtonWrapper;
