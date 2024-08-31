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
      <div className="pt-5 font-consolas text-black/70">Registration Ends In...</div>
      <div className="flex px-8 pb-5 pt-3.5 font-inter">
        <DateItem key={'DAYS'} value="25" unit="DAYS" />
        <Separator />
        <DateItem key={'HOURS'} value="25" unit="HOURS" />
        <Separator />
        <DateItem key={'MINUTES'} value="25" unit="MINUTES" />
        <Separator />
        <DateItem key={'SECONDS'} value="25" unit="SECONDS" />
      </div>
    </div>
  );
};

export default CountDown;
