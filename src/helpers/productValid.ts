import { IProduct } from '../types/product';

interface IProductValid {
	isValid: boolean;
	content?: string;
}

export const productValid = (product: IProduct): IProductValid => {
	if (product.device === 'Devices')
		return { isValid: false, content: 'You have not selected a device' };

	if (product.brand === 'Brands')
		return { isValid: false, content: 'You have not selected a brand' };

	if (!product.name.trim().length)
		return { isValid: false, content: "You didn't enter anything in name" };

	if (product.price === '')
		return { isValid: false, content: 'You have not selected a price' };
	else if (!Number(product.price))
		return { isValid: false, content: 'You entered incorrect data in price' };

	if (product.count === '')
		return { isValid: false, content: 'You have not selected a count' };
	else if (!Number(product.count))
		return { isValid: false, content: 'You entered incorrect data in count' };

	return { isValid: true };
};

export const filterConcatProducts = (
	products: IProduct[],
	f_prod: string[]
): IProduct[] => {
	if (!f_prod) return products;
	for (const item_prod of f_prod) {
		products = products.map(product =>
			product.productId === item_prod ? { ...product, like: true } : product
		);
	}
	
	return products;
};
