export interface IDevice {
	deviceId: string;
	nameD: string;
}

export interface IBrand {
	brandId: string;
	nameB: string;
}

export interface IBrandAndDevice {
	brands: IBrand[];
	devices: IDevice[];
}

export enum DeviceOrBrandTypeActions {
	FETCH_DEVICE = 'FETCH_DEVICE',
	FETCH_BRAND = 'FETCH_BRAND',
}

interface fetchDevice {
	type: DeviceOrBrandTypeActions.FETCH_DEVICE;
	payload: IDevice[];
}

interface fetchBrand {
	type: DeviceOrBrandTypeActions.FETCH_BRAND;
	payload: IBrand[];
}

export type DeviceOrBrandAction = fetchDevice | fetchBrand;

/*  Product  */
export interface ICharacter {
	id: string;
	title: string;
	text: string;
}

export interface IProduct {
	id?: string;
	productId: string;
	name: string;
	brand: string;
	device: string;
	price: string;
	count: string;
	like: boolean;
	characters: ICharacter[];
	image: string;
}

export enum ProductTypeActions {
	FETCH_PRODUCT = 'FETCH_PRODUCT',
	FILTER_DEVICE = 'FILTER_DEVICE',
	FILTER_BRAND = 'FILTER_BRAND',
	FILTER_NAME = 'FILTER_NAME',
	LIKE_PRODUCT = 'LIKE_PRODUCT',
	ADD_PRODUCT = 'ADD_PRODUCT',
}

interface fetchProduct {
	type: ProductTypeActions.FETCH_PRODUCT;
	payload: IProduct[];
}

interface filterDevice {
	type: ProductTypeActions.FILTER_DEVICE;
	payload: string;
}

interface filterBrand {
	type: ProductTypeActions.FILTER_BRAND;
	payload: string;
}

interface filterName {
	type: ProductTypeActions.FILTER_NAME;
	payload: string;
}

interface likeProduct {
	type: ProductTypeActions.LIKE_PRODUCT;
	payload: string;
}

interface addProduct {
	type: ProductTypeActions.ADD_PRODUCT;
	payload: IProduct;
}

export type ProductAction =
	| fetchProduct
	| filterDevice
	| filterBrand
	| filterName
	| likeProduct
	| addProduct;
