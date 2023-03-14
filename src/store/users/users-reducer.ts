import {
	IToggleComplete,
	UserAction,
	UserTypeActions,
	IUser,
} from './../../types/users';
// import { IProduct } from '../../types/product';
import { searchDublicateBlogItem } from '../../helpers/blogHelpers';

interface InitialStateProps {
	user: IToggleComplete[];
	person_data: IToggleComplete;
	role: string;
	name: string;
}

const personData: IToggleComplete = {
	id: '',
	name: '',
	email: '',
	password: '',
	role: '',
	block: false,
	shop_card: [],
	f_prod: [],
	blogItem: [],
};

const initialState: InitialStateProps = {
	user: [],
	person_data: personData,
	role: 'All',
	name: '',
};

export const usersReducer = (
	state = initialState,
	action: UserAction
): InitialStateProps => {
	switch (action.type) {
		case UserTypeActions.PERSON_DATA:
			return { ...state, person_data: action.payload };
		case UserTypeActions.FETCH_USER:
			return { ...state, user: action.payload };
		case UserTypeActions.FIND_USER:
			return { ...state, role: action.payload.role, name: action.payload.name };
		case UserTypeActions.ADD_FAVORITE_PRODUCTS:
			return {
				...state,
				person_data: {
					...state.person_data,
					f_prod: [...state.person_data.f_prod, action.payload],
				},
			};
		case UserTypeActions.DEL_FAVORITE_PRODUCTS:
			return {
				...state,
				person_data: {
					...state.person_data,
					f_prod: state.person_data.f_prod.filter(
						prod => prod !== action.payload
					),
				},
			};
		case UserTypeActions.ADD_SHOP_CARD:
			return {
				...state,
				person_data: {
					...state.person_data,
					shop_card: state.person_data.shop_card.map(item =>
						item.productId === action.payload.productId
							? { ...item, count: action.payload.count }
							: item
					),
				},
			};
		case UserTypeActions.NEW_SHOP_CARD:
			for (const product of state.person_data.shop_card) {
				if (product.productId === action.payload.productId) return state;
			}

			return {
				...state,
				person_data: {
					...state.person_data,
					shop_card: [...state.person_data.shop_card, action.payload],
				},
			};
		case UserTypeActions.DELETE_SHOP_CARD:
			return {
				...state,
				person_data: {
					...state.person_data,
					shop_card: state.person_data.shop_card.filter(
						item => item.productId !== action.payload
					),
				},
			};
		case UserTypeActions.TOTAL_SHOP_PROD:
			return {
				...state,
				person_data: { ...state.person_data },
			};
		case UserTypeActions.ADD_BLOG_ITEM:
			return {
				...state,
				person_data: {
					...state.person_data,
					blogItem: searchDublicateBlogItem(
						state.person_data.blogItem,
						action.payload
					),
				},
			};
		default:
			return state;
	}
};
