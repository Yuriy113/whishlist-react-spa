import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { wishesApi } from "../../api/crud";
import WishListsForm from "../../components/common/WishListsForm";
import { useToast } from "../../components/ui/Toast";
import type { Wish } from "../../types";
import { ROUTES } from "../../utils/constants/routes";

const EditWishlist = () => {
    const [title, setTitle] = useState("");
    const [wishes, setWishes] = useState<Wish[]>([]);
    const { id: wishlistId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const [canEdit, setCanEdit] = useState(false);

    useEffect(() => {
        const fetchWishlist = async () => {
            if (!wishlistId) {
                return;
            }

            const data = await wishesApi.getOne(wishlistId);
            const wishlist = data.wishlist;

            setCanEdit(wishlist.canEdit);
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

    const handleItemChange = (index: number, type: string, value: string) => {
        setWishes((prev) =>
            prev.map((wish, i) =>
                i === index ? { ...wish, [type]: value } : wish,
            ),
        );
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await wishesApi.updateWishList(wishlistId || "", {
                title,
                wishes,
            });

            showToast("Список сохранен", { variant: "success" });

            setTitle(response.wishlist.title);
            setWishes(response.wishlist.wishes);
        } catch {
            showToast("Не удалось сохранить список", { variant: "error" });
        }
    };

    const handleRemoveWishList = async () => {
        if (!wishlistId) {
            return;
        }

        await wishesApi.removeWishList(wishlistId);
        navigate(`${ROUTES.MY_WISHLISTS}`);
    };

    const handleShareWishList = async () => {
        if (!navigator.canShare) {
            const shareUrl = window.location.href;
            await navigator.clipboard.writeText(shareUrl);
            showToast("Ссылка на список скопирована в буфер обмена", {
                variant: "success",
            });
            return;
        }

        navigator.share({
            title: title,
            text: "Мой вишлист",
            url: `${window.location.origin}/wishlist/${wishlistId}`,
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
            onItemChange={handleItemChange}
            onRemoveButtonClick={handleRemoveButtonClick}
            onRemoveWishList={handleRemoveWishList}
            onShareWishList={handleShareWishList}
            canEdit={canEdit}
        />
    );
};

export default EditWishlist;
