import {useForm} from "react-hook-form";
import {IconSearch} from "@/assets";
import React from "react";

type TProps = {
    label: string;
    type: string;
    id: string;
    placeholder: string;
    required?: string;
    name: string;
    register: any;
    errors?:any;
    pattern?: RegExp;
    defaultValue?: string | number;
}

export const InputLabel = ({
                               label,
                               type,
                               id,
                               placeholder,
                               required,
                               name,
                               register = () => {},
                               errors,
                               pattern,
                               defaultValue

}: TProps) => {

    return (
        <div className="cont">
            <label htmlFor={id}>{label}</label>
            <input
                {...register(name && name, {
                    required: required,
                    pattern: {
                        value: {pattern},
                        message: "숫자만 입력해주세요."
                    }
                })}
                type={type}
                id={id}
                placeholder={placeholder}
                aria-invalid={errors ? "true" : "false"}
                style={{ borderColor: errors ? "#FF7C7C" : "#ABABAB" }}
                defaultValue={defaultValue}
            />
            {errors && <small role="alert">* {errors.message}</small>}
            {name === "title" &&
                <div className="search-icon">
                    <IconSearch />
                </div>
            }
        </div>
    )
}
