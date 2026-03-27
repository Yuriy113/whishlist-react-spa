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
    onItemChange: (index: number, type: string, value: string) => void;
    onRemoveButtonClick?: (index: number) => void;
    onRemoveWishList?: () => void;
    onShareWishList?: () => void;
    canEdit?: boolean;
}

const WishListsForm = (props: WishListsFormProps) => {
    const {
        handleSubmit,
        title,
        onChangeTitle,
        handleAddButtonClick,
        wishes,
        onItemChange,
        onRemoveButtonClick,
        onRemoveWishList,
        onShareWishList,
        canEdit = true,
    } = props;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.titleLabel} htmlFor="title">
                <span>Название вишлиста</span>
                <Input
                    name="title"
                    type="text"
                    placeholder="Название"
                    value={title}
                    onChange={onChangeTitle}
                    isDisabled={!canEdit}
                />
            </label>

            {canEdit && (
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
            )}

            {wishes.map((item, index) => (
                <div
                    className={cn(styles.singleWish, {
                        [styles.toRemove]: item.toRemove,
                    })}
                    key={index}
                >
                    {canEdit ? (
                        <>
                            <Input
                                name={`link-${index}`}
                                placeholder="Название"
                                value={item.name}
                                onChange={(e) =>
                                    onItemChange(index, "name", e.target.value)
                                }
                                isDisabled={!canEdit}
                            />

                            <Input
                                name={`item-${index}`}
                                placeholder="Описание"
                                value={item.description}
                                onChange={(e) =>
                                    onItemChange(
                                        index,
                                        "description",
                                        e.target.value,
                                    )
                                }
                                isDisabled={!canEdit}
                                variant="textarea"
                                rows={3}
                            />

                            <Input
                                name={`link-${index}`}
                                placeholder="Ссылка"
                                value={item.link}
                                onChange={(e) =>
                                    onItemChange(index, "link", e.target.value)
                                }
                                isDisabled={!canEdit}
                            />
                        </>
                    ) : (
                        <div className={styles.descriptionText}>
                            <div>Название: {item.name}</div>
                            <div>Описание: {item.description}</div>
                            <div>
                                Ссылка:{" "}
                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {item.link}
                                </a>
                            </div>
                        </div>
                    )}
                    {canEdit && (
                        <div style={{ width: "90px" }}>
                            <Button
                                onClick={() => onRemoveButtonClick?.(index)}
                            >
                                Удалить
                            </Button>
                        </div>
                    )}
                </div>
            ))}

            {canEdit && (
                <div className={styles.saveBtnContainer}>
                    <Button type="submit">Сохранить</Button>
                    {onRemoveWishList && (
                        <Button type="button" onClick={onRemoveWishList}>
                            Удалить
                        </Button>
                    )}
                    {onShareWishList && (
                        <Button type="button" onClick={onShareWishList}>
                            Поделиться
                        </Button>
                    )}
                </div>
            )}
        </form>
    );
};

export default WishListsForm;
