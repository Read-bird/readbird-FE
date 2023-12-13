import { IconBaseProps } from '@react-icons/all-files';
import { FaPlus } from '@react-icons/all-files/fa/FaPlus';
import { HiDotsHorizontal } from '@react-icons/all-files/hi/HiDotsHorizontal';

const Icons = {
  dots: HiDotsHorizontal,
  plus: FaPlus
};

type TProps = {
  iconKey: keyof typeof Icons;
} & IconBaseProps;

export const IconReact = ({ iconKey, ...props }: TProps) => {
  const IconComponent = Icons[iconKey];

  return <IconComponent {...props} />;
};
