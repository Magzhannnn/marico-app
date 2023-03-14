import { IBlog } from './blog';
import { IProduct } from './product';

export interface IFindUser {
	name: string;
	role: string;
}

export interface IUser {
	userId?: string;
	name: string;
	email: string;
	password: string;
	role: string;
	block: boolean;
	shop_card: IProduct[];
	f_prod: string[];
	blogItem: IBlog[];
}

export interface IToggleComplete extends IUser {
	id?: string;
}

export enum UserTypeActions {
	FIND_USER = 'FIND_USER',
	FETCH_USER = 'FETCH_USER',
	PERSON_DATA = 'PERSON_DATA',
	ADD_FAVORITE_PRODUCTS = 'ADD_FAVORITE_PRODUCTS',
	DEL_FAVORITE_PRODUCTS = 'DEL_FAVORITE_PRODUCTS',
	ADD_SHOP_CARD = 'ADD_SHOP_CARD',
	NEW_SHOP_CARD = 'NEW_SHOP_CARD',
	DELETE_SHOP_CARD = 'DELETE_SHOP_CARD',
	TOTAL_SHOP_PROD = 'TOTAL_SHOP_PROD',
	ADD_BLOG_ITEM = 'ADD_BLOG_ITEM',
}

interface personData {
	type: UserTypeActions.PERSON_DATA;
	payload: IUser;
}

interface fetchUser {
	type: UserTypeActions.FETCH_USER;
	payload: IToggleComplete[];
}

interface findUser {
	type: UserTypeActions.FIND_USER;
	payload: IFindUser;
}

interface addFavoriteProducts {
	type: UserTypeActions.ADD_FAVORITE_PRODUCTS;
	payload: string;
}

interface delFavoriteProducts {
	type: UserTypeActions.DEL_FAVORITE_PRODUCTS;
	payload: string;
}

interface addShopCard {
	type: UserTypeActions.ADD_SHOP_CARD;
	payload: { productId: string; count: string };
}
interface newShopCard {
	type: UserTypeActions.NEW_SHOP_CARD;
	payload: IProduct;
}

interface deleteShopCard {
	type: UserTypeActions.DELETE_SHOP_CARD;
	payload: string;
}

interface totalShopProd {
	type: UserTypeActions.TOTAL_SHOP_PROD;
	payload: string;
}

interface addBlogItem {
	type: UserTypeActions.ADD_BLOG_ITEM;
	payload: IBlog;
}

// export type UserAction = removeUser | blockUser | fetchUser;
export type UserAction =
	| personData
	| findUser
	| fetchUser
	| addFavoriteProducts
	| delFavoriteProducts
	| addShopCard
	| newShopCard
	| deleteShopCard
	| totalShopProd
	| addBlogItem;
