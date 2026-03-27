import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { wishesApi } from "../../api/crud";
import type { WishList } from "../../types";
import { ROUTES } from "../../utils/constants/routes";
import styles from "./style.module.css";

const MyWishlists = () => {
    const [wishlists, setWishLists] = useState<WishList[]>([]);

    useEffect(() => {
        const fetchWishLists = async () => {
            const data = await wishesApi.getAll("titles");
            setWishLists(data.wishlists);
        };

        fetchWishLists();
    }, []);

    return (
        <div className={styles.wishlistContainer}>
            {wishlists.map((wl, i) => (
                <div key={i}>
                    <Link
                        className={styles.wishlistLink}
                        to={`${ROUTES.EDIT_WISHLIST.replace(":id", wl.id?.toString() || "")}`}
                    >
                        {wl.title}
                    </Link>
                </div>
            ))}
        </div>
    );
};

export default MyWishlists;
