import { useState } from "react";

import { Input } from "../../components/ui/InputHook";

interface UseInputProps {
    name: string;
    initialValue?: string;
    type?: string;
}

export const useInput = (props: UseInputProps) => {
    const { name, initialValue = "", type = "text" } = props;

    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    const InputComponent = (
        <Input value={value} onChange={handleChange} type={type} name={name} />
    );

    return { value: value, Input: InputComponent };
};
