import cn from "clsx";

import type { Wish } from "../../../types";
import Button from "../../ui/Button";
import { Input } from "../../ui/Input";
import styles from "./style.module.css";

interface WishListsFormProps {
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    title: string;
    onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAddButtonClick: () => void;
    wishes: Wish[];
    handleItemDescriptionChange: (index: number, value: string) => void;
    onRemoveButtonClick?: (index: number) => void;
    onRemoveWishList?: () => void;
    onShareWishList?: () => void;
}

const WishListsForm = (props: WishListsFormProps) => {
    const {
        handleSubmit,
        title,
        onChangeTitle,
        handleAddButtonClick,
        wishes,
        handleItemDescriptionChange,
        onRemoveButtonClick,
        onRemoveWishList,
        onShareWishList,
    } = props;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                name="title"
                type="text"
                placeholder="Название"
                value={title}
                onChange={onChangeTitle}
            />

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

            {wishes.map((item, index) => (
                <div
                    className={cn(styles.singleWish, {
                        [styles.toRemove]: item.toRemove,
                    })}
                    key={index}
                >
                    <Input
                        name={`item-${index}`}
                        type="text"
                        placeholder="Описание"
                        value={item.description}
                        onChange={(e) =>
                            handleItemDescriptionChange(index, e.target.value)
                        }
                    />
                    <div style={{ width: "90px" }}>
                        <Button onClick={() => onRemoveButtonClick?.(index)}>
                            Удалить
                        </Button>
                    </div>
                </div>
            ))}

            <div className={styles.saveBtnContainer}>
                <Button type="submit">Сохранить</Button>
                {onRemoveWishList && (
                    <Button type="button" onClick={onRemoveWishList}>
                        Удалить
                    </Button>
                )}
                <Button type="button" onClick={onShareWishList}>
                    Поделиться
                </Button>
            </div>
        </form>
    );
};

export default WishListsForm;
