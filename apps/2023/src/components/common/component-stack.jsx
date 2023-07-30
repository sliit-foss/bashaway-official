import { cloneElement, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const ComponentStack = ({ className, itemStyle, children }) => {
  const [itemHovered, setItemHovered] = useState(false);

  return (
    <div className={twMerge('w-full flex flex-row h-[450px]', className)}>
      {children.map((child, index) => (
        <div
          key={index}
          className={twMerge(
            index === 0 && !itemHovered ? 'flex-[5_0_0%] md:flex-[3_0_0%]' : 'flex-1',
            'w-2/12 hover:flex-[5_0_0%] md:hover:flex-[3_0_0%] overflow-hidden transition-flex duration-1000',
            typeof itemStyle === 'function' ? itemStyle({ index, children, itemHovered }) : itemStyle
          )}>
          {cloneElement(child, {
            className: twMerge(child.props.className, 'w-full h-full object-cover'),
            onMouseEnter: index > 0 ? () => setItemHovered(true) : null,
            onMouseLeave: index > 0 ? () => setItemHovered(false) : null
          })}
        </div>
      ))}
    </div>
  );
};

export default ComponentStack;
