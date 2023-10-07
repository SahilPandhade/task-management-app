import { ChangeEvent, FormEvent, useState } from "react"
import { LoginType, RegisterType } from "./Types";


interface Props {
    callback: (values:RegisterType | LoginType | {}) => void,
    initialState: RegisterType | LoginType | {}
}
export const useForm = ({ callback, initialState = {} }: Props) => {
    const [values, setValues] = useState(initialState);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    }

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Submitting form")
        callback(values);
    }

    return {
        onChange,
        onSubmit,
        values
    }
}