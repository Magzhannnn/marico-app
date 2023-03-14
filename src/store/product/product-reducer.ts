import {
	IProduct,
	ProductAction,
	ProductTypeActions,
} from '../../types/product';

interface InitialStateProps {
	product: IProduct[];
	device: string;
	name: string;
	brand: string;
}

const initialState: InitialStateProps = {
	product: [],
	device: 'Devices',
	brand: 'ALL',
	name: '',
};

export const productsReducer = (
	state = initialState,
	action: ProductAction
): InitialStateProps => {
	switch (action.type) {
		case ProductTypeActions.FETCH_PRODUCT:
			return { ...state, product: action.payload };
		case ProductTypeActions.FILTER_DEVICE:
			return { ...state, device: action.payload };
		case ProductTypeActions.FILTER_BRAND:
			return { ...state, brand: action.payload };
		case ProductTypeActions.FILTER_NAME:
			return { ...state, name: action.payload };
		case ProductTypeActions.LIKE_PRODUCT:
			return {
				...state,
				product: state.product.map(prod =>
					prod.productId === action.payload
						? { ...prod, like: !prod.like }
						: prod
				),
			};
		case ProductTypeActions.ADD_PRODUCT:
			return {
				...state,
				product: [...state.product, action.payload],
			};
		default:
			return state;
	}
};
