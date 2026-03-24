import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { wishesApi } from "../../api/crud";
import type { WishList } from "../../types";

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
        <div>
            {wishlists.map((wl, i) => (
                <div key={i}>
                    <Link to={`/edit-wishlist/${wl.id}`}>{wl.title}</Link>
                </div>
            ))}
        </div>
    );
};

export default MyWishlists;
