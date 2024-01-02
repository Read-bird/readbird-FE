import { useEffect, useRef } from 'react';
import styled from 'styled-components';

export const DisplayAds = () => {
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  };

  useEffect(() => {
    const pushAd = () => {
      try {
        const adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({});
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          throw e;
        }
      }
    };

    clearTimer();
    intervalId.current = setInterval(() => {
      if (window.adsbygoogle) {
        pushAd();
        clearTimer();
      }
    }, 1000);

    return () => {
      clearTimer();
    };
  }, []);

  return (
    <InsertedStyle
      className="adsbygoogle"
      data-ad-client="ca-pub-1919598055512436"
      data-ad-slot="3745103035"
    ></InsertedStyle>
  );
};

const InsertedStyle = styled.ins`
  display: inline-block;
  width: 100%;
  height: 66px;
`;
