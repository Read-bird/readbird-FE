import { IconSearch } from '@/assets';
import { TRegisterFormValue } from '@api/types';
import { InputHTMLAttributes, useCallback } from 'react';
import { UseFormRegisterReturn, useFormContext } from 'react-hook-form';

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
  const { setValue } = useFormContext<TRegisterFormValue>();

  const handleClickSearch = useCallback(() => {
    setValue('isbn', null);
    setValue('author', null);
    setValue('totalPage', 0);
    setValue('title', null);
    setValue('publisher', null);
  }, [setValue]);

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
        <div className="search-icon" onClick={handleClickSearch}>
          <IconSearch />
        </div>
      )}
    </div>
  );
};
