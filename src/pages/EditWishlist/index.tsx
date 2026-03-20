import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { wishesApi } from "../../api/crud";
import WishListsForm from "../../components/common/WishListsForm";
import { useInput } from "../../hooks/useInput";
import type { Wish } from "../../types";

const EditWishlist = () => {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const { id: wishlistId } = useParams<{ id: string }>();

    // if (!wishlistId) {
    //     return <div>Wishlist not found</div>;
    // }

    useEffect(() => {
        const fetchWishlist = async () => {
            const data = await wishesApi.getAll();
            console.log("data", data);
            const wishlist = data.wishlists.find(
                (wl: any) => wl.id === wishlistId,
            );
            console.log("wishlist", wishlist);
            setWishes(wishlist?.wishes || []);
        };
        fetchWishlist();
    }, [wishlistId]);

    console.log("wishes", wishes);

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
        // wishesApi.updateWishList(wishlistId, { title: nameValue, wishes });
        console.log(wishlistId, nameValue, wishes);
    };

    return (
        <WishListsForm
            handleSubmit={handleSubmit}
            NameInput={NameInput}
            handleAddButtonClick={handleAddButtonClick}
            wishes={wishes}
            handleItemDescriptionChange={handleItemDescriptionChange}
        />
    );
};

export default EditWishlist;
