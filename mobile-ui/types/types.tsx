export interface IItem {
    itemId: string;
    name: string;
    description: string;
    price: number;
}

export interface IBasketItem {
    item: IItem;
    count: number;
    total: number;
}

export interface IBasket {
    basketId: string;
    items: { [basketId: string]: IBasketItem };
    basketTotal: number;
    totalItems: number;
}

export interface IUser {
    username: string;
    token: string;
}

export interface ICard {
    name: string;
    number: string;
    ccv: number;
    exp: string;
}

export interface IProfile {
    username: string;
    email: string;
    cards: { [cardId: string]: ICard };
    address: string;
}

export interface IOrder {
    orderId: string;
    username: string;
    basket: IBasket;
    card: ICard;
    address: string;
}
