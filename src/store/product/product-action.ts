import { IProduct, ProductTypeActions } from '../../types/product';

export const fetchProduct = (products: IProduct[]) => ({
	type: ProductTypeActions.FETCH_PRODUCT,
	payload: products,
});

export const filterDevice = (device: string) => ({
	type: ProductTypeActions.FILTER_DEVICE,
	payload: device,
});

export const filterBrand = (brand: string) => ({
	type: ProductTypeActions.FILTER_BRAND,
	payload: brand,
});

export const filterName = (name: string) => ({
	type: ProductTypeActions.FILTER_NAME,
	payload: name,
});

export const likeProduct = (id: string) => ({
	type: ProductTypeActions.LIKE_PRODUCT,
	payload: id,
});

export const addProduct = (product: IProduct) => ({
	type: ProductTypeActions.ADD_PRODUCT,
	payload: product,
});
