import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './AdminView.module.css';
import Container from '../../UI/Container/Container';
import AdminViewItem from './AdminViewItem';
import { RootState } from '../../store/rootReducer';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../helpers/firebaseHelpers';
import { fetchUsers } from '../../store/users/users-actions';
import {
	selectFindUsers,
	selectAllUsers,
} from '../../store/users/users-selectors';

const AdminViewList = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [userId, setUserId] = useState(localStorage.getItem('userId'));

	const users = useSelector((state: RootState) =>
		selectFindUsers(state, userId as string)
	);

	const personDataFunc = async () => {
		const userData = await fetchData('users');
		dispatch(fetchUsers(userData));
	};

	useEffect(() => {
		setUserId(localStorage.getItem('userId'));
	}, [location]);

	useEffect(() => {
		personDataFunc(); 
	}, [users]);

	if (!users.length)
		return (
			<h1 className='mt-[50px] text-center text-3xl'>
				There are no persons!!!
			</h1>
		);

	return (
		<Container className={styles['admin-view_list']}>
			<AdminViewItem
				index='№'
				name='Name'
				email='Email'
				password='Password'
				role='Role'
				block='Block'
				remove='Delete'
			/>
			{users
				.sort((x, y) => x.name.localeCompare(y.name))
				.map((user, index) => (
					<AdminViewItem
						key={`view_${user.userId}`}
						index={index + 1}
						id={user.id}
						role={user.role}
						name={user.name}
						email={user.email}
						password={user.password}
						block={user.block}
					/>
				))}
		</Container>
	);
};
export default AdminViewList;
