import { SectionBadge } from '../common/badges';

const prizes = [
  {
    place: '1st',
    text: 'The Winner LKR 40,000'
  },
  {
    place: '2nd',
    text: 'The Runner Up LKR 30,000'
  },
  {
    place: '3rd',
    text: 'The 2nd Runner up LKR 20,000'
  }
];

const Prizes = () => {
  return (
    <div className="w-full flex flex-col py-6 px-10 lg:px-24 gap-y-10">
      <SectionBadge>Prizes</SectionBadge>
      <div className="flex flex-col gap-5">
        {prizes.map((prize, index) => {
          return (
            <>
              <div className="flex gap-5 sm:gap-7">
                <div className="min-w-[70px] sm:min-w-[100px] h-fit flex justify-center items-center py-3 bg-black rounded-full">
                  <span className="uppercase text-white text-xl sm:text-4xl">{prize.place}</span>
                </div>
                <span className="uppercase text-3xl sm:text-6xl font-medium">{prize.text}</span>
              </div>
              {prizes.length !== index + 1 && <hr className="border-black" />}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Prizes;
