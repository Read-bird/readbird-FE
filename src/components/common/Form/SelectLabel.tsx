import {useForm} from "react-hook-form";
import React from "react";

type TProps = {
    id: string;
    placeholder: string;
    requiredText?: string;
    name: string;
    options: (number | string)[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    defaultValue?: string;
}

export const SelectLabel = ({
                                id,
                                placeholder,
                                requiredText,
                                name,
                                options,
                                onChange,
                                disabled,
                                defaultValue
                            }: TProps) => {
    const {
        register,
        control,
        watch,
        formState: {errors},
    } = useForm();

    return(
        <select
            id={id}
            placeholder={placeholder}
            {...register(name, {
                required: requiredText !== "",
            })}
            onChange={onChange}
            disabled={disabled}
            value={defaultValue}
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}
