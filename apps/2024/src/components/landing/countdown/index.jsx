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
    <div className="bg-white text-center">
      <span>Registration Ends In ...</span>
      <div className="flex">
        <DateItem key={'DAYS'} value="25" unit="DAYS" />
        <Separator className="mx-2" />
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
