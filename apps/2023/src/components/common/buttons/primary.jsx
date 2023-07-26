import { Link } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={twMerge(
        'group flex justify-center items-center cursor-pointer rounded-3xl px-4 py-[0.4rem] bg-black text-white outline-none transition-all duration-medium splash',
        className
      )}
      {...props}>
      {typeof children === 'string' ? <span className={twMerge('font-semibold')}>{children}</span> : children}
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
