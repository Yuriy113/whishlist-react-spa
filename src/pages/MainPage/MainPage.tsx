import Button from "../../components/ui/Button";
import styles from "./mainPage.module.css";

export const MainPage = () => {
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
