import { useEffect } from 'react';
import styles from './Pricing.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { IProduct } from '../../types/product';
import { handleLike } from '../../helpers/firebaseHelpers';
import { likeProduct } from '../../store/product/product-action';
import {
	addFavoriteProducts,
	delFavoriteProducts,
	newShopCard,
} from '../../store/users/users-actions';
import {
	selectFavoriteproductPerson,
	selectPersonData,
} from '../../store/users/users-selectors';

interface PricingItem {
	product: IProduct;
}

const PricingItem: React.FC<PricingItem> = ({ product }) => {
	const dispatch: any = useDispatch();
	const f_prod = useSelector(selectFavoriteproductPerson);
	let person = useSelector(selectPersonData);
	// const users = useSelector(selectAllUsers);

	const classesLike: string = product.like
		? styles['pricing-item_like_red']
		: styles['pricing-item_like_white'];

	const likeHandler = () => {
		dispatch(likeProduct(product.productId));
		if (!product.like) dispatch(addFavoriteProducts(product.productId));
		else dispatch(delFavoriteProducts(product.productId));
		setTimeout(() => {
			alert('Refresh the page!!!');
		}, 500);
	};

	const buyHandler = (e: React.MouseEvent) => {
		dispatch(newShopCard({ ...product, count: '1' }));
	};

	useEffect(() => {
		handleLike(person.id as string, f_prod);
		localStorage.setItem('user', JSON.stringify({ ...person, shop_card: [] }));
	}, [f_prod]);

	return (
		<div className={styles['pricing-item']}>
			<div className={styles[`pricing-item_image`]}></div>
			<div className={classesLike} onClick={likeHandler}></div>
			<div className={styles['pricing-item_name']}>{product.name}</div>
			<div className={styles['pricing-item_device']}>{product.device}</div>
			<div className={styles['pricing-item_foot']}>
				<div className={styles['pricing-item_price']}>{product.price}$</div>
				<div className={styles['pricing-item_buy']} onClick={buyHandler}>
					buy
				</div>
			</div>
		</div>
	);
};
export default PricingItem;
