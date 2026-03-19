import { useEffect, useState } from "react";

import { wishesApi } from "../../api/crud";
import type { WishList } from "../../types";

const MyWishlists = () => {
    const [wishlists, setWishLists] = useState<WishList[]>([]);

    useEffect(() => {
        const fetchWishLists = async () => {
            const data = await wishesApi.getAll();
            setWishLists(data.wishlists);
        };

        fetchWishLists();
    }, []);

    console.log(wishlists);

    return (
        <div>
            {wishlists.map((wl, i) => (
                <div key={i}>
                    <p>{wl.title}</p>
                    <p></p>
                </div>
            ))}
        </div>
    );
};

export default MyWishlists;
