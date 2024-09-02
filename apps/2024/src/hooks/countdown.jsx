import { useEffect } from 'react';
import { useState } from 'react';

function useCountdown({ targetDate }) {
  const countDownDate = targetDate.getTime();
  const [remainingTime, setRemainingTime] = useState(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const formatTimeUnit = (val) =>
    Number(val).toLocaleString('en-US', {
      minimumIntegerDigits: 2
    });

  const extractUnitVals = (remainingTime) => {
    const days = formatTimeUnit(Math.floor(remainingTime / (1000 * 60 * 60 * 24)));
    const hours = formatTimeUnit(Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const minutes = formatTimeUnit(Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)));
    const seconds = formatTimeUnit(Math.floor((remainingTime % (1000 * 60)) / 1000));

    return {
      days,
      hours,
      minutes,
      seconds,
      milliSeconds: remainingTime
    };
  };

  return extractUnitVals(remainingTime);
}

export default useCountdown;
