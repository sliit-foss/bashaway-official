import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        'group flex justify-center items-center cursor-pointer rounded-3xl px-4 py-[0.4rem] bg-black text-white font-semibold outline-none transition-all duration-medium splash',
        className
      )}
      {...props}>
      {children}
    </button>
  );
};

const ButtonWrapper = ({ to, target = '_self', ...props }) => {
  if (to) {
    return (
      <Link to={to} target={target}>
        <Button {...props} />
      </Link>
    );
  }
  return <Button {...props} />;
};

export default ButtonWrapper;
