import { RootState } from '../rootReducer';
import { IProduct } from '../../types/product';

export const selectAllProducts = (state: RootState) => state.products.product;

export const selectDevice = (state: RootState) => state.products.device;

export const selectBrand = (state: RootState) => state.products.brand;

export const selectAllProductInfo = (state: RootState) => state.products;

export const selectFilterProducts = (
	state: RootState,
	name: string,
	brand: string,
	device: string
): IProduct[] => {
	if (device === 'Devices' && name === '' && brand === 'ALL')
		//device: Devices, name: '', brand: ALL
		return state.products.product;
	else if (device === 'Devices') {
		if (name === '')
			//device: Devices, name: '', brand: {brand}
			return state.products.product.filter(prod => prod.brand === brand);
		else {
			if (brand === 'ALL')
				//device: Devices, name: {name}, brand: ALL
				return state.products.product.filter(prod => prod.name.includes(name));
			//device: Devices, name: {name}, brand: {brand}
			return state.products.product.filter(
				prod => prod.brand === brand && prod.name.includes(name)
			);
		}
	} else {
		if (name === '') {
			//device: {device}, name: '', brand: ALL
			if (brand === 'ALL')
				return state.products.product.filter(prod => prod.device === device);
			//device: {device}, name: '', brand: {brand}
			return state.products.product.filter(
				prod => prod.brand === brand && prod.device === device
			);
		} else {
			if (brand === 'ALL')
				//device: {device}, name: {name}, brand: ALL
				return state.products.product.filter(
					prod => prod.name.includes(name) && prod.device === device
				);
			//device: {device}, name: {name}, brand: {brand}
			return state.products.product.filter(
				prod =>
					prod.brand === brand &&
					prod.name.includes(name) &&
					prod.device === device
			);
		}
	}
};
