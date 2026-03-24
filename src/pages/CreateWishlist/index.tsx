import { useState } from "react";

import { wishesApi } from "../../api/crud";
import WishListsForm from "../../components/common/WishListsForm";
import type { Wish } from "../../types";

const CreateWishlist = () => {
    const [title, setTitle] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);

    const handleAddButtonClick = () => {
        setWishes([...wishes, { name: "", description: "" }]);
    };

    const handleItemDescriptionChange = (index: number, value: string) => {
        setWishes((prev) =>
            prev.map((wish, i) =>
                i === index ? { ...wish, description: value } : wish,
            ),
        );
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        wishesApi.createWishList({ title, wishes });
    };

    return (
        <WishListsForm
            handleSubmit={handleSubmit}
            title={title}
            onChangeTitle={handleChangeTitle}
            handleAddButtonClick={handleAddButtonClick}
            wishes={wishes}
            handleItemDescriptionChange={handleItemDescriptionChange}
        />
    );
};

export default CreateWishlist;
