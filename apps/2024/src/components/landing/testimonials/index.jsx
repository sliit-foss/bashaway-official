/* eslint-disable react/no-unknown-property */
import { twMerge } from 'tailwind-merge';
import { SectionBadge } from '@/components/common/badges';
import testimonials from './data.json';

const Testimonials = () => {
  return (
    <div className="w-full flex flex-col py-6 px-6 md:px-10 lg:px-36 gap-y-10 overflow-hidden">
      <SectionBadge id="sponsors">Testimonials</SectionBadge>
      <div className="grid grid-flow-col gap-8 auto-cols-[90%] md:auto-cols-[50%] lg:auto-cols-[33%] animate-scroll-reel">
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={index}
            className={twMerge(
              'relative bg-white aspect-rectangle flex flex-col justify-center rounded-2xl p-6 text-black shadow-md',
              'w-full h-[200px] sm:h-[220px] md:h-[250px] overflow-hidden break-words',
              testimonial.styles?.wrapper
            )}>
            <p className="text-lg font-semibold mb-2 text-left">{testimonial.comment}</p>
            <span className="font-bold text-blue-600 mt-4 text-left">{testimonial.name}</span>
            <span className="text-gray-500 text-sm text-left">{testimonial.position}</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        @layer utilities {
          @keyframes scroll-reel {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-scroll-reel {
            animation: scroll-reel 20s linear infinite;
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
