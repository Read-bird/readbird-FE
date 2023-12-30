import { IconReact } from '@assets/icons';
import { colors } from '@style/global-style';
import { ReactNode, useMemo } from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

type TProps = {
  children: ReactNode[] | ReactNode;
  width?: string;
  height?: string;
} & Settings;

export const ReactSlider = ({ children, width, height, ...settingProps }: TProps) => {
  const wrapperStyle = useMemo(() => ({ width, height }), [width, height]);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <IconReact iconKey="arrow_left" color={colors.darkGray} />,
    nextArrow: <IconReact iconKey="arrow_right" color={colors.darkGray} />,
    ...settingProps
  };

  return (
    <div style={wrapperStyle}>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};
