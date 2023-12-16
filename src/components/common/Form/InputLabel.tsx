import {useForm} from "react-hook-form";
import {IconSearch} from "@/assets";

type TProps = {
    label: string;
    type: string;
    id: string;
    placeholder: string;
    requiredText?: string;
    name: string;
}

export const InputLabel = ({
                               label,
                               type,
                               id,
                               placeholder,
                               requiredText,
                               name,

}: TProps) => {
    const {
        register,
        control,
        watch,
        formState: {errors},
    } = useForm();

    return (
        <div className="cont">
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                {...register(name, {
                    required: requiredText !== "",
                })}
            />
            {name === "title" &&
                <div className="search-icon">
                    <IconSearch />
                </div>
            }
        </div>
    )
}
