import { SVGProps } from 'react';

type TIconProps = {
  fillColor?: string;
  strokeColor?: string;
} & SVGProps<SVGSVGElement>;

export const IconBook = ({ fillColor = '#E3CCF2', strokeColor = 'white' }: TIconProps) => {
  return (
    <svg width="46" height="39" viewBox="0 0 46 39" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M34.5 0C28.1534 0 23 4.5918 23 10.2542C23 4.5918 17.8466 0.0128986 11.5 0.0128986C5.15336 0.0128986 0 4.6047 0 10.2671C0 10.2671 0 10.28 0 10.2929V38.2564C0 38.7852 0.563846 38.9916 0.852329 38.5789C2.57012 36.025 6.68757 34.2321 11.5 34.2321C16.3124 34.2321 20.443 36.025 22.1477 38.5789C22.423 38.9916 23 38.7852 23 38.2564C23 38.7852 23.5638 38.9916 23.8523 38.5789C25.5701 36.025 29.6876 34.2321 34.5 34.2321C39.3124 34.2321 43.443 36.025 45.1477 38.5789C45.423 38.9916 46 38.7852 46 38.2564V10.2929C46 10.2929 46 10.28 46 10.2671C46 4.6047 40.8466 0.0128986 34.5 0.0128986V0ZM23 10.28C23 10.28 23 10.28 23 10.2671C23 10.2671 23 10.2671 23 10.28Z"
        fill={fillColor}
      />
      <path
        d="M34.833 12.9697L33.5741 11.7483C32.972 11.1645 32.005 11.1735 31.412 11.7663L21.1491 22.0225L16.1681 17.1908C15.6846 16.7238 14.891 16.7238 14.4166 17.1998L12.7654 18.8523C12.291 19.3282 12.291 20.1096 12.7745 20.5766L20.3189 27.8961C20.8024 28.3631 21.5961 28.3631 22.0705 27.8871L34.8513 15.1072C35.4442 14.5144 35.4351 13.5625 34.833 12.9787V12.9697Z"
        fill={strokeColor}
      />
    </svg>
  );
};
