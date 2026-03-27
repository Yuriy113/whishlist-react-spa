export interface Wish {
    id?: string;
    name?: string;
    description?: string;
    link?: string;
    toRemove?: boolean;
}

export interface WishList {
    id?: number;
    title: string;
    wishes: Wish[];
}
