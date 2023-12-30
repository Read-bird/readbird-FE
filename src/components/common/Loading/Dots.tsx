import { useEffect, useRef, useState } from 'react';

export const Dots = () => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const [dots, setDots] = useState('...');

  useEffect(() => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }

    intervalId.current = setInterval(() => {
      setDots((prev) => {
        if (prev.length >= 3) {
          return '.';
        } else {
          return prev.concat('.');
        }
      });
    }, 400);

    return () => {
      if (intervalId.current !== null) {
        clearInterval(intervalId.current);
        intervalId.current = null;
      }
    };
  }, []);

  return <p className="absolute">{dots}</p>;
};
