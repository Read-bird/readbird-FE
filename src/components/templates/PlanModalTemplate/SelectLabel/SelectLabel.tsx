import { ChangeEvent, SelectHTMLAttributes, useCallback } from 'react';

type TProps = {
  options: string[];
  handleChangeDate?: (value: string) => void;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const SelectLabel = ({ options, handleChangeDate, ...props }: TProps) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      handleChangeDate?.(value);
    },
    [handleChangeDate]
  );

  return (
    <select {...props} onChange={handleChange}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
