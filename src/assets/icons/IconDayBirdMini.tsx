import { SVGProps } from 'react';

type TIconProps = {
  fillColor?: string;
  strokeColor?: string;
} & SVGProps<SVGSVGElement>;

export const IconDayBirdMini = ({
  fillColor = 'transparent',
  strokeColor = '#ABABAB',
  ...props
}: TIconProps) => {
  return (
    <svg
      width="17"
      height="15"
      viewBox="0 0 17 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.8222 10.3837H14.2193C14.7487 9.30874 14.9944 8.0704 14.8482 6.7604C14.5177 3.75915 12.1017 1.3484 9.10947 1.03595C6.59695 0.775094 4.3389 1.9561 3.05486 3.85661L1.30282 3.73335C1.07175 3.73048 0.925505 3.97987 1.03958 4.18052L2.16568 5.80298C1.92876 6.68587 1.86733 7.64329 2.03991 8.6351C2.51374 11.3726 4.72792 13.5426 7.46859 13.9324C9.62426 14.2392 11.6161 13.4795 12.9909 12.1007C12.9909 12.1007 12.9938 12.1007 12.9967 12.1007C13.6548 11.4902 14.8511 11.0172 15.8748 10.7219C16.0679 10.6675 16.0269 10.378 15.8251 10.378L15.8222 10.3837Z"
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
