import { IconSearch } from '@/assets';
import { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type TProps<T extends string> = {
  label: string;
  register: UseFormRegisterReturn<T>;
  errors?: any;
  isViewSearchIcon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputLabel = <T extends string>({
  label,
  register,
  errors,
  isViewSearchIcon = false,
  ...props
}: TProps<T>) => {
  return (
    <div className="cont">
      <label htmlFor={props.id}>{label}</label>
      <input
        {...props}
        {...register}
        aria-invalid={errors ? 'true' : 'false'}
        style={{ borderColor: errors ? '#FF7C7C' : '#ABABAB' }}
      />
      <small role="alert">{errors && `* ${errors.message}`}</small>
      {isViewSearchIcon && (
        <div className="search-icon">
          <IconSearch />
        </div>
      )}
    </div>
  );
};
