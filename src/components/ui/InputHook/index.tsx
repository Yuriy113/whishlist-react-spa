import styles from "./input.module.css";

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    value?: string;
    setValue?: (value: string) => void;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const {
        type = "text",
        name,
        placeholder = "",
        value = "",
        setValue,
        onChange,
    } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue?.(e.target.value);
        onChange?.(e);
    };

    return (
        <input
            className={styles.input}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
};
