import { useState } from 'react';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { IDevice } from '../../types/product';
import { useNavigate } from 'react-router-dom';
import { userFirebase } from '../../firebase/user';
import { PRICING_ROUTE } from '../../utils/consts';
import styles from './SellerAddProductForm.module.css';
import { addDoc, collection } from '@firebase/firestore';

const SellerAddDevice = () => {
	const navigate = useNavigate();
	const [device, setDevice] = useState('');

	const deviceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDevice(e.target.value);
	};

	const clickHandler = async () => {
		if (!device) return;

		try {
			const savedDevice: IDevice = {
				deviceId: Date.now().toString(),
				nameD: device,
			};
			const docRef = await addDoc(collection(userFirebase, 'devices'), {
				...savedDevice,
			});

			// console.log('Document written with ID: ', docRef.id);
		} catch (error) {
			console.error('Error adding document: ', error);
		}

		setDevice('');
		navigate(PRICING_ROUTE);
	};

	return (
		<div className={styles.device}>
			<Input
				className={styles['device_input']}
				type='text'
				title='Device'
				value={device}
				onChangeHandler={deviceHandler}
			/>
			<Button
				title='Add'
				className={styles['device_btn']}
				onClickHandler={clickHandler}
			/>
		</div>
	);
};
export default SellerAddDevice;
