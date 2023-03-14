import styles from './Pricing.module.css';
import { useState, useEffect } from 'react';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { SELLER_ROUTE } from '../../utils/consts';
import { userFirebase } from '../../firebase/user';
import { addDoc, collection } from '@firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';
import { IBrand } from '../../types/product';
import { useDispatch, useSelector } from 'react-redux';
import { filterName, filterBrand } from '../../store/product/product-action';
import {
	selectShopCardPerson,
	selectTotalShopCard,
} from '../../store/users/users-selectors';
import SellProduct from '../../components/SellProduct/SellProduct';

interface PricingFilterProps {
	brands: IBrand[];
}

const PricingFilter: React.FC<PricingFilterProps> = ({ brands }) => {
	const [isModal, setIsModal] = useState({ active: false, item: '' });
	const shoppingProducts = useSelector(selectShopCardPerson);
	const totalShoppingProductsCard = useSelector(selectTotalShopCard);

	const dispatch = useDispatch();

	const [name, setName] = useState('');
	const [selectBrand, setSelectBrand] = useState('ALL');

	const navigate = useNavigate();
	const location = useLocation();
	const [role, setRole] = useState(localStorage.getItem('role'));

	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const brandHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectBrand(e.target.value);
	};

	const findHandler = () => {
		console.log('name:', name);
		console.log('brand:', selectBrand);

		dispatch(filterName(name));
		dispatch(filterBrand(selectBrand));
	};

	const sellHandler = () => {
		setIsModal({ ...isModal, active: true });
	};

	const buyProductsHandler = async () => {
		if (totalShoppingProductsCard === 0) {
			alert('Вы ничего не купили!!!');
		} else {
			try {
				await addDoc(collection(userFirebase, 'sells'), {
					...shoppingProducts,
				});
			} catch (error) {
				console.error('Error adding document: ', error);
			}
			setIsModal({ active: false, item: '' });
		}
	};

	useEffect(() => {
		setRole(localStorage.getItem('role'));
	}, [location]);

	// useEffect(() => {
	// 	console.log(shoppingProducts);
	// }, [shoppingProducts]);

	return (
		<>
			<div className={styles['price-filter']}>
				<Input
					type='text'
					title='Enter...'
					value={name}
					onChangeHandler={nameHandler}
					className={styles['price-filter_input']}
				/>
				<select
					className={styles['price-filter_select']}
					value={selectBrand}
					onChange={brandHandler}
				>
					<option value='ALL' className={styles.select_option}>
						ALL
					</option>
					{brands
						.sort((x, y) => x.nameB.localeCompare(y.nameB))
						.map(brand => (
							<option
								value={brand.nameB}
								key={brand.brandId}
								className={styles.select_option}
							>
								{brand.nameB}
							</option>
						))}
				</select>
				{role === 'seller' && (
					<div
						className={styles['price-filter_add']}
						onClick={() => navigate(SELLER_ROUTE)}
					>
						＋
					</div>
				)}
				<Button
					title='Find'
					className={styles['price-filter_btn']}
					onClickHandler={findHandler}
				/>
				<Button
					title='Sell'
					className={styles['price-filter_btn']}
					onClickHandler={sellHandler}
				/>
			</div>
			<Modal
				active={isModal.active}
				setActive={setIsModal}
				className={styles['modal_content_active']}
			>
				{!shoppingProducts.length ? (
					<h1 className='text-center text-2xl'>Empty</h1>
				) : (
					<>
						<SellProduct shoppingProducts={shoppingProducts} />
						<div className={styles['show-prod']}>
							<div className={styles['show-prod_total']}>
								Total:{' '}
								<span className='font-medium ml-2'>
									{totalShoppingProductsCard}$
								</span>
							</div>
							<Button
								title={'Buy'}
								className='mr-[45px]'
								onClickHandler={buyProductsHandler}
							/>
						</div>
					</>
				)}
			</Modal>
		</>
	);
};
export default PricingFilter;
