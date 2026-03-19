import cn from "clsx";
import { Link } from "react-router-dom";

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
        href = "",
        isDisabled,
        className,
    } = props;

    if (type === "link") {
        return (
            <Link to={href} className={cn(styles.button, className)}>
                {children}
            </Link>
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
