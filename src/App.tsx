import { useEffect } from "react";

import authApi from "./api/auth";
import Button from "./components/ui/Button";
import styles from "./app.module.css";

const App = () => {
    useEffect(() => {
        authApi
            .me()
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                authApi.loginAsGuest().then((response) => {
                    console.log(response);
                });
            });
    }, []);

    return (
        <div className={styles.app}>
            <h1>My wishlist</h1>

            <div className={styles.buttonsGroup}>
                <div className={styles.buttonContainer}>
                    <Button type="link" href="/create">
                        Создать вишлист
                    </Button>
                </div>
                <div className={styles.buttonContainer}>
                    <Button type="link" href="/my-wishlists">
                        Мои вишлисты
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default App;
