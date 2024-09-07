import { useEffect, useState } from 'react';

function useCountdown({ targetDate }) {
  const countDownDate = targetDate.getTime();
  const getRemainingTime = () => Math.max(0, countDownDate - Date.now());

  const [remainingTime, setRemainingTime] = useState(getRemainingTime());
  const [didCountDownComplete, setDidCountDownComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = getRemainingTime();
      setRemainingTime(timeLeft);
      setDidCountDownComplete(timeLeft === 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const extractUnitVals = (time) => ({
    days: Math.floor(time / (1000 * 60 * 60 * 24)),
    hours: Math.floor((time / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((time / 1000 / 60) % 60),
    seconds: Math.floor((time / 1000) % 60)
  });

  const formatUnitTime = (val) => val.toLocaleString('en-US', { minimumIntegerDigits: 2 });

  const transformTime = (time) =>
    Object.entries(extractUnitVals(time)).reduce((acc, [key, value]) => ({ ...acc, [key]: formatUnitTime(value) }), {});

  return { ...transformTime(remainingTime), didCountDownComplete };
}

export default useCountdown;
