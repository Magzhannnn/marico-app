import { useState } from 'react';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';
import SellerAddBrand from './SellerAddBrand';
import SellerAddDevice from './SellerAddDevice';
import SellerAddProductItem from "./SellerAddProductItem"
import styles from './SellerAddProductForm.module.css';

export interface IModal {
	active: boolean;
	item: string;
}

const SellerAddProductForm = () => {
	const [isModal, setIsModal] = useState<IModal>({ active: false, item: '' });

	return (
		<>
			<form className={styles['add-product_form']}>
				<Button
					title='Add brand'
					className={styles['form_btn']}
					onClickHandler={() => setIsModal({ active: true, item: 'brand' })}
				/>
				<Button
					title='Add device'
					className={styles['form_btn']}
					onClickHandler={() => setIsModal({ active: true, item: 'device' })}
				/>
				<Button
					title='Add product'
					className={styles['form_btn']}
					onClickHandler={() => setIsModal({ active: true, item: 'product' })}
				/>
			</form>
			{isModal.item === 'brand' && (
				<Modal active={isModal.active} setActive={setIsModal}>
					<SellerAddBrand />
				</Modal>
			)}
			{isModal.item === 'device' && (
				<Modal active={isModal.active} setActive={setIsModal}>
					<SellerAddDevice />
				</Modal>
			)}
			{isModal.item === 'product' && (
				<Modal active={isModal.active} setActive={setIsModal}>
					<SellerAddProductItem />
				</Modal>
			)}
		</>
	);
};
export default SellerAddProductForm;
