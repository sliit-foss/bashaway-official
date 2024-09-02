import { Separator } from '@/components/common/separator/index';
import DateItem from './date-item';

const CountDown = () => {
  //   const data = [
  //     { value: 25, unit: 'DAYS' },
  //     { value: 23, unit: 'HOURS' },
  //     { value: 25, unit: 'MINUTES' },
  //     { value: 25, unit: 'SECONDS' }
  //   ];

  return (
    <div className="bg-white text-center rounded-[15px] ">
      <div className="pt-3 lg:pt-5 font-consolas text-black/70">Registration Ends In...</div>
      <div className="flex px-6 lg:px-8 pb-4 lg:pb-5 pt-2 font-inter">
        <DateItem key={'D'} value="25" unit="DD" />
        <Separator />
        <DateItem key={'H'} value="25" unit="HH" />
        <Separator />
        <DateItem key={'M'} value="25" unit="MM" />
        <Separator />
        <DateItem key={'S'} value="25" unit="SS" />
      </div>
    </div>
  );
};

export default CountDown;
