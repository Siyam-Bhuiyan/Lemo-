import { useEffect, useState } from 'react';

/** Counts down from `seconds` once per second and returns the remaining minutes/seconds. */
export function useCountdown(seconds = 0) {
  const [left, setLeft] = useState(seconds);

  useEffect(() => {
    if (left <= 0) return;
    const id = setInterval(() => setLeft((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [left <= 0]);

  return { minutes: Math.floor(left / 60), seconds: left % 60 };
}
