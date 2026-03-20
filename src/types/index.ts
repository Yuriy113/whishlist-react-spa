export interface Wish {
    id: number;
    name: string;
    description: string;
}

export interface WishList {
    id?: number;
    title: string;
    wishes: Wish[];
}
