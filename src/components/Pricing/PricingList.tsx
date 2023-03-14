import { useEffect, useState } from 'react';
import styles from './Pricing.module.css';
import PricingItem from './PricingItem';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectAllProductInfo,
	selectFilterProducts,
} from '../../store/product/product-selectors';
import { IProduct } from '../../types/product';
import { RootState } from '../../store/rootReducer';
import { fetchProduct } from '../../store/product/product-action';
import { filterConcatProducts } from '../../helpers/productValid';
import { selectPersonData } from '../../store/users/users-selectors';

const PricingList = () => {
	const [load, setLoad] = useState(false);
	const productInfo = useSelector(selectAllProductInfo);
	const person = useSelector(selectPersonData);
	const products: IProduct[] = useSelector((state: RootState) =>
		selectFilterProducts(
			state,
			productInfo.name,
			productInfo.brand,
			productInfo.device
		)
	);

	const dispatch = useDispatch();

	useEffect(() => {
		if (products.length && !load) setLoad(true);
	}, [products]);

	useEffect(() => {
		dispatch(
			fetchProduct(filterConcatProducts(productInfo.product, person.f_prod))
		);
	}, [load]);

	if (!products.length)
		return (
			<h1 className='text-3xl text-center mt-10'>There are no products</h1>
		);

	return (
		<div className={styles['pricing-list']}>
			{products.map(product => (
				<PricingItem key={`product_${product.id}`} product={product} />
			))}
		</div>
	);
};
export default PricingList;
