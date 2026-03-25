import { Outlet, useLocation } from "react-router-dom";

import Button from "../components/ui/Button";
import styles from "./style.module.css";

export const Layout = () => {
    const location = useLocation();

    const isMainPage = location.pathname === "/";

    return (
        <div className={styles.outlet}>
            {!isMainPage && (
                <Button type="link" href="/" className={styles.homeButton}>
                    Главная
                </Button>
            )}
            <Outlet />
        </div>
    );
};
