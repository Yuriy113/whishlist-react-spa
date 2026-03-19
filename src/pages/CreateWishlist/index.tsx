import { useState } from "react";

import { wishesApi } from "../../api/crud";
import Button from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { useInput } from "../../hooks/useInput";
import type { Wish } from "../../types";
import styles from "./createWishlist.module.css";

const CreateWishlist = () => {
    const [wishes, setWishes] = useState<Wish[]>([]);

    const handleAddButtonClick = () => {
        setWishes([
            ...wishes,
            { id: wishes.length + 1, name: "", description: "" },
        ]);
    };

    const handleItemDescriptionChange = (id: number, value: string) => {
        setWishes((prev) =>
            prev.map((wish) =>
                wish.id === id ? { ...wish, description: value } : wish,
            ),
        );
    };

    const { value: nameValue, Input: NameInput } = useInput({
        name: "wishlistName",
    });

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        wishesApi.createWishList({ title: nameValue, wishes });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            {NameInput}

            <div className={styles.container}>
                <div className={styles.addBtnContainer}>
                    <Button
                        onClick={handleAddButtonClick}
                        className={styles.addBtn}
                    >
                        +
                    </Button>
                </div>
                Добавить элемент
            </div>

            {wishes.map((item) => (
                <div key={item.id}>
                    <Input
                        name={`item-${item.id}`}
                        type="text"
                        placeholder="Описание"
                        value={item.description}
                        onChange={(e) =>
                            handleItemDescriptionChange(item.id, e.target.value)
                        }
                    />
                </div>
            ))}

            <div className={styles.saveBtnContainer}>
                <Button type="submit">Сохранить</Button>
            </div>
        </form>
    );
};

export default CreateWishlist;
