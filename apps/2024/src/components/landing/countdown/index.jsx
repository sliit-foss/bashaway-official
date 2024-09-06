import { Separator } from '@/components/common/separator/index';
import useCountdown from '@/hooks/countdown';
import TimeItem from './time-item';

const CountDown = () => {
  const { days, hours, minutes, seconds } = useCountdown({ targetDate: new Date('September 8, 2024 00:00:00') });

  return (
    <div className="bg-white text-center rounded-[15px] ">
      <div className="pt-3 lg:pt-5 font-consolas text-black/70">Registration Ends In...</div>
      <div className="flex px-6 lg:px-8 pb-4 lg:pb-5 pt-2 font-inter">
        <TimeItem key={'d'} value={days} unit="DD" />
        <Separator />
        <TimeItem key={'h'} value={hours} unit="HH" />
        <Separator />
        <TimeItem key={'m'} value={minutes} unit="MM" />
        <Separator />
        <TimeItem key={'s'} value={seconds} unit="SS" />
      </div>
    </div>
  );
};

export default CountDown;
