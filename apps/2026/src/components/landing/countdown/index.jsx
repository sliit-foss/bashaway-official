import { Separator } from '@/components/common/separator/index';
import { TIME_FINAL_ROUND_START, TIME_FIRST_ROUND_START, TIME_REGISTRATION_CLOSING } from '@/constants/dates';
import { useCountdown } from '@/hooks';
import TimeItem from './time-item';

const milestones = [
  { label: 'Registrations closing in', date: TIME_REGISTRATION_CLOSING },
  { label: 'Round 1 starts in', date: TIME_FIRST_ROUND_START },
  { label: 'Final starts in', date: TIME_FINAL_ROUND_START }
];

const CountDown = () => {
  const next = milestones.find((milestone) => new Date(milestone.date).getTime() > Date.now());
  const { days, hours, minutes, seconds } = useCountdown({ targetDate: next?.date ?? 0 });

  if (!next) return null;

  return (
    <div className="bg-white text-center rounded-[15px] ">
      <div className="pt-3 lg:pt-5 font-consolas text-black/70">{next.label}</div>
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
