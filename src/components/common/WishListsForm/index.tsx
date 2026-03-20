import type { Wish } from "../../../types";
import Button from "../../ui/Button";
import { Input } from "../../ui/Input";
import styles from "./style.module.css";

interface WishListsFormProps {
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    NameInput: React.ReactNode;
    handleAddButtonClick: () => void;
    wishes: Wish[];
    handleItemDescriptionChange: (id: number, value: string) => void;
}

const WishListsForm = (props: WishListsFormProps) => {
    const {
        handleSubmit,
        NameInput,
        handleAddButtonClick,
        wishes,
        handleItemDescriptionChange,
    } = props;

    console.log(wishes);

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

export default WishListsForm;
