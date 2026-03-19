export interface Wish {
    id: number;
    name: string;
    description: string;
}

export interface WishList {
    title: string;
    wishes: Wish[];
}
