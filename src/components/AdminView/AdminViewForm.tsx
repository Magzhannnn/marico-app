import { useState, useEffect } from 'react';
import styles from './AdminView.module.css';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
import { IFindUser } from '../../types/users';
import { useDispatch, useSelector } from 'react-redux';
import { findUsers } from '../../store/users/users-actions';
import { selectAllInfoOfUsers } from '../../store/users/users-selectors';

const AdminViewForm = () => {
	const [find, setFind] = useState<IFindUser>({ name: '', role: 'All' });
	const dispatch: any = useDispatch();
	const users = useSelector(selectAllInfoOfUsers);

	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFind(prev => ({ ...prev, name: e.target.value }));
	};

	const roleHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFind(prev => ({ ...prev, role: e.target.value }));
	};

	const findHandler = (e: React.MouseEvent) => {
		dispatch(findUsers(find));
	};

	const clearHandler = () => {
		setFind({ name: '', role: 'All' });
		dispatch(findUsers({ name: '', role: 'All' }));
	};

	return (
		<div className={styles['admin-view_form']}>
			<Input
				className={styles['admin-filter_input']}
				type='text'
				title='Enter account name...'
				value={find.name}
				onChangeHandler={nameHandler}
			/>
			<select
				className={styles['admin-filter_select']}
				onChange={roleHandler}
				value={find.role}
			>
				<option value='All' className={styles.select_option}>
					ALL
				</option>
				<option value='Admin' className={styles.select_option}>
					Admin
				</option>
				<option value='Seller' className={styles.select_option}>
					Seller
				</option>
				<option value='User' className={styles.select_option}>
					User
				</option>
			</select>
			<Button
				title='Find'
				className={styles['btn']}
				onClickHandler={findHandler}
			/>
			<Button
				title='Clear'
				className={styles['btn']}
				onClickHandler={clearHandler}
			/>
		</div>
	);
};
export default AdminViewForm;
