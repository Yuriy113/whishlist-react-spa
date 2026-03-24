export interface Wish {
    id?: string;
    name: string;
    description: string;
}

export interface WishList {
    id?: number;
    title: string;
    wishes: Wish[];
}
