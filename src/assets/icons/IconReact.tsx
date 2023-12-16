import { IconBaseProps } from '@react-icons/all-files';
import { HiDotsHorizontal } from '@react-icons/all-files/hi/HiDotsHorizontal';
import { IoIosArrowBack } from '@react-icons/all-files/io/IoIosArrowBack';
import { IoIosArrowForward } from '@react-icons/all-files/io/IoIosArrowForward';

const Icons = {
  dots: HiDotsHorizontal,
  arrow_left: IoIosArrowBack,
  arrow_right: IoIosArrowForward
};

type TProps = {
  iconKey: keyof typeof Icons;
} & IconBaseProps;

export const IconReact = ({ iconKey, ...props }: TProps) => {
  const IconComponent = Icons[iconKey];

  return <IconComponent {...props} />;
};
