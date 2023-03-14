import { addDoc, collection } from '@firebase/firestore';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userFirebase } from '../../firebase/user';
import { productValid } from '../../helpers/productValid';
import { selectAllBrandsAndDevices } from '../../store/devices_brands/d_b-selectors';
import { addProduct } from '../../store/product/product-action';
import { ICharacter, IProduct } from '../../types/product';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { PRICING_ROUTE } from '../../utils/consts';
import styles from './SellerAddProductForm.module.css';

const SellerAddProductItem = () => {
	const [inCorrect, setInCorrect] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [count, setCount] = useState('');
	const [brand, setBrand] = useState('Brands');
	const [device, setDevice] = useState('Devices');
	const [arrayChar, setArrayChar] = useState<ICharacter[]>([]);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { devices, brands } = useSelector(selectAllBrandsAndDevices);

	const brandHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setBrand(e.target.value);
	};

	const deviceHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDevice(e.target.value);
	};

	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const priceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrice(e.target.value);
	};

	const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCount(e.target.value);
	};

	const addCharHandler = () => {
		setArrayChar(prev =>
			prev.concat({
				id: Date.now().toString(),
				title: '',
				text: '',
			})
		);
	};

	const titleHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		setArrayChar(prev =>
			prev.map(char =>
				char.id === id ? { ...char, title: e.target.value } : char
			)
		);
	};

	const textHandler = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		setArrayChar(prev =>
			prev.map(char =>
				char.id === id ? { ...char, text: e.target.value } : char
			)
		);
	};

	const removeCharHandler = (id: string) => {
		setArrayChar(prev => prev.filter(char => char.id !== id));
	};

	const saveProductHandler = async () => {
		const product: IProduct = {
			productId: Date.now().toString(),
			name,
			brand,
			device,
			price,
			count,
			like: false,
			characters: arrayChar,
			image: '',
		};

		const result = productValid(product);
		if (result.isValid) {
			try {
				await addDoc(collection(userFirebase, 'products'), product);
			} catch (error) {
				console.error('Error adding document: ', error);
			}
			dispatch(addProduct(product));

			setDevice('Devices');
			setBrand('Brands');
			setName('');
			setCount('');
			setPrice('');
			setArrayChar([]);
			navigate(PRICING_ROUTE);
		} else {
			setInCorrect(result.content as string);
		}
	};

	return (
		<div className={styles.product} onFocus={() => setInCorrect('')}>
			{inCorrect && <h1 className='mb-2 text-2xl text-red-500'>{inCorrect}</h1>}
			<div className='space-x-5 text-left'>
				<select
					className={styles['product-select']}
					value={device}
					onChange={deviceHandler}
				>
					<option value='Devices'>Devices</option>
					{devices.map(device => (
						<option
							value={device.nameD}
							key={device.deviceId}
							className={styles['select_option']}
						>
							{device.nameD}
						</option>
					))}
				</select>
				<select
					className={styles['product-select']}
					value={brand}
					onChange={brandHandler}
				>
					<option value='Brands'>Brands</option>
					{brands.map(brand => (
						<option
							value={brand.nameB}
							key={brand.brandId}
							className={styles['select_option']}
						>
							{brand.nameB}
						</option>
					))}
				</select>
			</div>
			<Input
				className={styles['product_input']}
				type='text'
				title='Name'
				value={name}
				onChangeHandler={nameHandler}
			/>
			<Input
				className={styles['product_input']}
				type='text'
				title='Price'
				value={price}
				onChangeHandler={priceHandler}
			/>
			<Input
				className={styles['product_input']}
				type='text'
				title='Count'
				value={count}
				onChangeHandler={countHandler}
			/>
			<Button
				title='Add character'
				onClickHandler={addCharHandler}
				className={styles['product-btn']}
			/>
			{arrayChar.map(charact => (
				<div className={styles['product-add_char']} key={charact.id}>
					<Input
						className={styles['product_input']}
						type='text'
						title='title'
						value={charact.title}
						onChangeHandler={e => titleHandler(e, charact.id)}
					/>
					<Input
						className={styles['product_input']}
						type='text'
						title='text'
						value={charact.text}
						onChangeHandler={e => textHandler(e, charact.id)}
					/>
					<Button
						title={'X'}
						className={styles['add-char_btn']}
						onClickHandler={() => removeCharHandler(charact.id)}
					/>
				</div>
			))}
			<Button
				title='Save'
				onClickHandler={saveProductHandler}
				className={styles['product-btn']}
			/>
		</div>
	);
};
export default SellerAddProductItem;
