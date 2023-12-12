import { SVGProps } from 'react';

type TIconProps = {
  width?: number;
  height?: number;
  fillColor?: string;
  strokeColor?: string;
} & SVGProps<SVGSVGElement>;

export const IconDayBird = ({
  width = 42,
  height = 37,
  fillColor = 'transparent',
  strokeColor = '#ABABAB',
  ...props
}: TIconProps) => {
  return (
    <svg
      width={`${width}`}
      height={`${height}`}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M40.5259 26.2638H36.2516C37.6633 23.3697 38.3185 20.0357 37.9285 16.5088C37.0471 8.42847 30.6045 1.938 22.6253 1.09678C15.9252 0.394484 9.90374 3.57412 6.47962 8.69087L1.80752 8.35901C1.19134 8.35129 0.801346 9.02272 1.10554 9.56295L4.10847 13.9311C3.47669 16.3081 3.31289 18.8858 3.77308 21.556C5.03665 28.9263 10.9411 34.7685 18.2496 35.8181C23.998 36.6439 29.3097 34.5987 32.9756 30.8866C32.9756 30.8866 32.9834 30.8866 32.9912 30.8866C34.7462 29.2427 37.9363 27.9693 40.6663 27.1744C41.1811 27.0278 41.0719 26.2483 40.5337 26.2483L40.5259 26.2638Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeMiterlimit="10"
      />
    </svg>
  );
};
