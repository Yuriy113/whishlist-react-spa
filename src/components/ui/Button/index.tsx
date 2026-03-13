import cn from "clsx";

import styles from "./button.module.css";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset" | "link";
    href?: string;
    isDisabled?: boolean;
    className?: string;
}

const Button = (props: ButtonProps) => {
    const {
        children,
        onClick,
        type = "button",
        href,
        isDisabled,
        className,
    } = props;

    if (type === "link") {
        return (
            <a className={cn(styles.button, className)} href={href}>
                {children}
            </a>
        );
    }

    return (
        <button
            className={cn(styles.button, className)}
            onClick={onClick}
            type={type}
            disabled={isDisabled}
        >
            {children}
        </button>
    );
};

export default Button;
