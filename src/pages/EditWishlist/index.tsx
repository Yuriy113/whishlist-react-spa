import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { wishesApi } from "../../api/crud";
import WishListsForm from "../../components/common/WishListsForm";
import type { Wish } from "../../types";
import { ROUTES } from "../../utils/constants/routes";

const EditWishlist = () => {
    const [title, setTitle] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);
    const { id: wishlistId } = useParams<{ id: string }>();
    const navigate = useNavigate();

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

    const handleRemoveButtonClick = (index: number) => {
        setWishes((prev) =>
            prev.map((wish, i) =>
                i === index ? { ...wish, toRemove: true } : wish,
            ),
        );
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

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await wishesApi.updateWishList(wishlistId || "", {
            title,
            wishes,
        });

        setTitle(response.wishlist.title);
        setWishes(response.wishlist.wishes);
    };

    const handleRemoveWishList = async () => {
        if (!wishlistId) {
            return;
        }

        await wishesApi.removeWishList(wishlistId);
        navigate(`${ROUTES.MY_WISHLISTS}`);
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
            onRemoveButtonClick={handleRemoveButtonClick}
            onRemoveWishList={handleRemoveWishList}
        />
    );
};

export default EditWishlist;
