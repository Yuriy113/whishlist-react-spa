import styles from "./input.module.css";

interface InputProps {
    type: string;
    name: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const {
        type = "text",
        name,
        placeholder = "",
        value = "",
        onChange,
    } = props;

    return (
        <input
            className={styles.input}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};
