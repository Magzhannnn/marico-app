import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../UI/Button/Button';
import styles from './SellProduct.module.css';
import { IProduct } from '../../types/product';
import { deleteShopCard, addShopCard } from '../../store/users/users-actions';

interface SellProductItemProps {
	product: IProduct;
}

const SellProductItem: React.FC<SellProductItemProps> = ({ product }) => {
	const dispatch = useDispatch();
	const [count, setCount] = useState(+product.count);

	const addShopProdHandler = () => {
		dispatch(addShopCard(product.productId, count.toString()));
	};

	useEffect(() => {
		addShopProdHandler();
	}, [count]);

	const removeShopProdHandler = () => {
		dispatch(deleteShopCard(product.productId));
	};

	return (
		<>
			<div className={styles['sell-product_item']}>
				<div className={styles['item_left']}>
					<div className={styles['name']}>
						Name: <span className={styles['span_item']}>{product.name}</span>
					</div>
					<div className={styles['brand']}>
						Brand: <span className={styles['span_item']}>{product.brand}</span>
					</div>
					<div className={styles['device']}>
						Device:{' '}
						<span className={styles['span_item']}>{product.device}</span>
					</div>
					<div className={styles['price']}>
						Price:{' '}
						<span className={styles['span_item']}>
							{+product.price * count}$
						</span>
					</div>
					<div className={styles['count']}>
						Count:{' '}
						<span
							className={styles['count_iter']}
							onClick={() => count > 0 && setCount(count - 1)}
						>
							-
						</span>{' '}
						<span className='font-medium text-2xl'>{count}</span>{' '}
						<span
							className={styles['count_iter']}
							onClick={() => setCount(count + 1)}
						>
							+
						</span>
					</div>
				</div>
				<div className={styles['item_right']}></div>
			</div>
			<div className='w-4/5 mx-auto'>
				<Button
					title={'Remove'}
					className={styles['show-prod_btn_remove']}
					onClickHandler={removeShopProdHandler}
				/>
			</div>
		</>
	);
};
export default SellProductItem;
