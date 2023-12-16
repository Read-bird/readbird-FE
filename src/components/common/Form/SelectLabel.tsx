import {useForm} from "react-hook-form";
import React from "react";

type TProps = {
    id: string;
    placeholder: string;
    requiredText?: string;
    name: string;
    options: (number | string)[];
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectLabel = ({
                                id,
                                placeholder,
                                requiredText,
                                name,
                                options,
                                onChange
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
        >
            {options.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}
