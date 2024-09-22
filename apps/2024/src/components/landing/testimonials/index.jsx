import Marquee from 'react-fast-marquee';
import { twMerge } from 'tailwind-merge';
import { SectionBadge } from '@/components/common/badges';
import testimonials from './data.json';

const Testimonials = () => {
  return (
    <>
      <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
        <SectionBadge id="testimonials">Testimonials</SectionBadge>
      </div>
      <Marquee speed={50} pauseOnHover gradient={false}>
        <div className="flex gap-8 w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={twMerge(
                'relative bg-white flex flex-col justify-center rounded-2xl p-6 text-black shadow-md',
                'w-[440px] h-[200px] sm:h-[220px] md:h-[250px] overflow-hidden break-words',
                testimonial.styles?.wrapper,
                index === testimonials.length - 1 ? 'mr-8' : ''
              )}>
              <p className="text-lg font-semibold mb-2 text-left">{testimonial.comment}</p>
              <span className="font-bold text-blue-600 mt-4 text-left">{testimonial.name}</span>
              <span className="text-gray-500 text-sm text-left">{testimonial.position}</span>
            </div>
          ))}
        </div>
      </Marquee>
    </>
  );
};

export default Testimonials;
