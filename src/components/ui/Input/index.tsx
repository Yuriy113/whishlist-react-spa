import styles from "./input.module.css";

type BaseProps = {
    name: string;
    isDisabled?: boolean;
};

type InputVariantProps = BaseProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "disabled" | "name"> & {
        variant?: "input";
    };

type TextareaVariantProps = BaseProps &
    Omit<
        React.TextareaHTMLAttributes<HTMLTextAreaElement>,
        "disabled" | "name"
    > & {
        variant: "textarea";
    };

export type InputProps = InputVariantProps | TextareaVariantProps;

export const Input = (props: InputProps) => {
    if (props.variant === "textarea") {
        const { isDisabled, ...textareaProps } = props;
        return (
            <textarea
                className={styles.textarea}
                disabled={isDisabled}
                {...textareaProps}
            />
        );
    }

    const { isDisabled, ...inputProps } = props;
    return (
        <input
            className={styles.input}
            type={inputProps.type ?? "text"}
            disabled={isDisabled}
            {...inputProps}
        />
    );
};
