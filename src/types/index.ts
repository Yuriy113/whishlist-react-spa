export interface Wish {
    id?: string;
    name: string;
    description: string;
    toRemove?: boolean;
}

export interface WishList {
    id?: number;
    title: string;
    wishes: Wish[];
}
