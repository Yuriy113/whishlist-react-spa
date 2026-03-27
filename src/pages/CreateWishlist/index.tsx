import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { wishesApi } from "../../api/crud";
import WishListsForm from "../../components/common/WishListsForm";
import type { Wish } from "../../types";
import { ROUTES } from "../../utils/constants/routes";

const CreateWishlist = () => {
    const [title, setTitle] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        setWishes([...wishes, { name: "", description: "" }]);
    };

    const handleItemChange = (index: number, type: string, value: string) => {
        setWishes((prev) =>
            prev.map((wish, i) =>
                i === index ? { ...wish, [type]: value } : wish,
            ),
        );
    };

    const handleRemoveButtonClick = (index: number) => {
        setWishes((prev) => prev.filter((_wish, i) => i !== index));
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await wishesApi.createWishList({ title, wishes });

        navigate(
            `${ROUTES.EDIT_WISHLIST.replace(":id", response.wishlist.id)}`,
        );
    };

    return (
        <WishListsForm
            handleSubmit={handleSubmit}
            title={title}
            onChangeTitle={handleChangeTitle}
            handleAddButtonClick={handleAddButtonClick}
            wishes={wishes}
            onItemChange={handleItemChange}
            onRemoveButtonClick={handleRemoveButtonClick}
        />
    );
};

export default CreateWishlist;
