import { SectionBadge } from '@/components/common';
import timeline from './data.json';

const Timeline = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10 ">
      <SectionBadge id="timeline">The Timeline</SectionBadge>
      <div className="flex gap-1 overflow-x-scroll">
        {timeline.map((item, index) => (
          <div key={index} className="max-w-[300px] min-w-[300px] flex flex-col bg-white p-6 gap-8 justify-between">
            <div className="flex flex-col gap-3">
              <span className="border border-black/10 rounded-full px-3 py-1 w-fit font-medium text-lg">
                {item.date}
              </span>
              <span className="text-4xl font-cabinet font-bold">{item.title}</span>
              <span className="text-black/40 text-xl">{item.description}</span>
            </div>
            <span className="text-black/25 text-xl">{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
