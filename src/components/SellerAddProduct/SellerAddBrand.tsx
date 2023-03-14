import { addDoc, collection } from '@firebase/firestore';
import { useState } from 'react';
import { userFirebase } from '../../firebase/user';
import { IBrand } from '../../types/product';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import styles from './SellerAddProductForm.module.css';
import { PRICING_ROUTE } from '../../utils/consts';
import { useNavigate } from 'react-router-dom';

const SellerAddBrand = () => {
	const navigate = useNavigate();
	const [brand, setBrand] = useState('');

	const brandHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setBrand(e.target.value);
	};

	const clickHandler = async () => {
		if (!brand) return;

		try {
			const savedDevice: IBrand = {
				brandId: Date.now().toString(),
				nameB: brand,
			};
			const docRef = await addDoc(collection(userFirebase, 'brands'), {
				...savedDevice,
			});

			// console.log('Document written with ID: ', docRef.id);
		} catch (error) {
			console.error('Error adding document: ', error);
		}

		setBrand('');
		navigate(PRICING_ROUTE);
	};

	return (
		<div className={styles.brand}>
			<Input
				className={styles['brand_input']}
				type='text'
				title='Brand'
				value={brand}
				onChangeHandler={brandHandler}
			/>
			<Button
				title='Add'
				className={styles['brand_btn']}
				onClickHandler={clickHandler}
			/>
		</div>
	);
};
export default SellerAddBrand;
