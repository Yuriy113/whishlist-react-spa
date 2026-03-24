import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { wishesApi } from "../../api/crud";
import WishListsForm from "../../components/common/WishListsForm";
import type { Wish } from "../../types";

const EditWishlist = () => {
    const [title, setTitle] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);
    const { id: wishlistId } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!wishlistId) {
                return;
            }

            const data = await wishesApi.getOne(wishlistId);
            const wishlist = data.wishlist;

            setWishes(wishlist.wishes);
            setTitle(wishlist.title);
        };
        fetchWishlist();
    }, [wishlistId]);

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
        wishesApi.updateWishList(wishlistId || "", {
            title,
            wishes,
        });
    };

    if (!wishlistId) {
        return <div>Wishlist not found</div>;
    }

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

export default EditWishlist;
