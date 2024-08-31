import * as SeparatorPrimitive from '@radix-ui/react-separator';
import * as React from 'react';
import { twMerge } from 'tailwind-merge';

const Separator = React.forwardRef(({ className, orientation = 'vertical', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={twMerge(
      'shrink-0 bg-border',
      'bg-black/10',
      'mx-7',
      orientation === 'vertical' ? 'h-100px w-[1px] ' : 'h-[1px] w-full',
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
