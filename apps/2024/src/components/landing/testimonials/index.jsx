/* eslint-disable react/no-unknown-property */
import { twMerge } from 'tailwind-merge';
import { SectionBadge } from '@/components/common/badges';
import testimonials from './data.json';

const Testimonials = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-36 gap-y-10 overflow-hidden">
      <SectionBadge id="sponsors">Testimonials</SectionBadge>
      <div
        className="grid grid-flow-col auto-cols-[33%] gap-8"
        style={{
          display: 'grid',
          gridAutoFlow: 'column',
          gridTemplateColumns: 'repeat(auto-fill, minmax(33%, 1fr))', // 3 boxes per row
          animation: 'scroll-reel 20s linear infinite'
        }}>
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={index}
            className={twMerge(
              'relative bg-white aspect-rectangle flex flex-col justify-center rounded-2xl p-6 text-black shadow-md',
              testimonial.styles?.wrapper
            )}
            style={{
              width: '100%', // Make each item take up the full width of the grid column
              height: '200px',
              whiteSpace: 'normal'
            }}>
            <p className="text-lg font-semibold mb-2 text-left">{testimonial.comment}</p>
            <span className="font-bold text-blue-600 mt-4 text-left">{testimonial.name}</span>
            <span className="text-gray-500 text-sm text-left">{testimonial.position}</span>
          </div>
        ))}
      </div>

      {/* Inline keyframes for the scroll animation */}
      <style jsx>{`
        @keyframes scroll-reel {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Testimonials;
