import {
	UserTypeActions,
	UserAction,
	IToggleComplete,
	IFindUser,
	IUser,
} from './../../types/users';
import { IBlog } from '../../types/blog';
import { IProduct } from '../../types/product';

export const personDataForm = (user: IToggleComplete) => ({
	type: UserTypeActions.PERSON_DATA,
	payload: user,
});

export const fetchUsers = (users: IToggleComplete[]): UserAction => ({
	type: UserTypeActions.FETCH_USER,
	payload: users,
});

export const findUsers = (findData: IFindUser) => ({
	type: UserTypeActions.FIND_USER,
	payload: findData,
});

export const addFavoriteProducts = (id: string) => ({
	type: UserTypeActions.ADD_FAVORITE_PRODUCTS,
	payload: id,
});

export const delFavoriteProducts = (id: string) => ({
	type: UserTypeActions.DEL_FAVORITE_PRODUCTS,
	payload: id,
});

export const addShopCard = (productId: string, count: string) => ({
	type: UserTypeActions.ADD_SHOP_CARD,
	payload: { productId, count },
});

export const newShopCard = (productData: IProduct) => ({
	type: UserTypeActions.NEW_SHOP_CARD,
	payload: productData,
});

export const deleteShopCard = (productId: string) => ({
	type: UserTypeActions.DELETE_SHOP_CARD,
	payload: productId,
});

export const totalShopProd = (price: string) => ({
	type: UserTypeActions.TOTAL_SHOP_PROD,
	payload: price,
});

export const addBlogItem = (blog: IBlog) => ({
	type: UserTypeActions.ADD_BLOG_ITEM,
	payload: blog,
});
