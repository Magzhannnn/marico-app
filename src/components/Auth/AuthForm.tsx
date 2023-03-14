import { addDoc, collection } from '@firebase/firestore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userFirebase } from '../../firebase/user';
import {
	authValid,
	chooseRole,
	isLoginValid,
	isThereSuch,
} from '../../helpers/authValid';
import { localStorageUsers } from '../../helpers/localStorage';
import { IUser } from '../../types/users';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import { ABOUT_ROUTE } from '../../utils/consts';
import styles from './Auth.module.css';
import { useDispatch } from 'react-redux';
import { personDataForm } from '../../store/users/users-actions';
import { fetchData } from '../../helpers/firebaseHelpers';
import { fetchUsers } from '../../store/users/users-actions';

interface AuthFormProps {
	users: IUser[];
	userLocate: boolean;
	loadingHandler: () => void;
	loadingNoHandler: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
	users,
	userLocate,
	loadingHandler,
	loadingNoHandler,
}) => {
	const [user, setUser] = useState<IUser>({
		name: '',
		password: '',
		email: '',
		role: '',
		block: false,
		shop_card: [],
		f_prod: [],
		blogItem: [],
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser(prev => ({ ...prev, name: e.target.value }));
	};

	const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser(prev => ({ ...prev, password: e.target.value }));
	};

	const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUser(prev => ({ ...prev, email: e.target.value }));
	};

	const personDataFunc = async () => {
		const userData = await fetchData('users');
		dispatch(fetchUsers(userData));
	};

	const clickHandler = async (e: React.MouseEvent) => {
		e.preventDefault();
		if (userLocate) {
			if (authValid(user.name, user.password)) {
				const userResult = isLoginValid(users, user);

				// personDataFunc();
				if (userResult.length) {
					if (!userResult[0].block) {
						navigate(ABOUT_ROUTE);
						localStorageUsers(userResult[0]);
					} else {
						alert(
							`Sorry you are blocked!!!\nYou have violated the rights of people in the site!!!\nWrite to this mail: bolatov_arman@live.kaznu.kz`
						);
					}
				} else {
					alert(
						'You have the wrong username or password!!!\nPlease enter again!!!'
					);
				}
			}
		} else {
			if (authValid(user.name, user.password, user.email)) {
				const roleData = chooseRole();
				if (roleData) {
					if (isThereSuch(users, user.name)) {
						loadingHandler();
						try {
							const userData: IUser = {
								...user,
								userId: Date.now().toString(),
								role: roleData,
							};

							await addDoc(collection(userFirebase, 'users'), {
								...userData,
							});

							localStorageUsers(userData);
							// console.log('Document written with ID: ', docRef.id);
						} catch (error) {
							console.error('Error adding document: ', error);
						}
						setUser({
							name: '',
							email: '',
							password: '',
							role: '',
							block: false,
							shop_card: [],
							f_prod: [],
							blogItem: [],
						});
						loadingNoHandler();
						navigate(ABOUT_ROUTE);
					}
				}
			}
		}
	};

	return (
		<form className={styles['auth-form']}>
			<Input
				type='text'
				title='Username'
				value={user.name}
				onChangeHandler={nameHandler}
			/>
			{!userLocate && (
				<Input
					type='email'
					title='Email Address'
					value={user.email}
					onChangeHandler={emailHandler}
				/>
			)}
			<Input
				type='password'
				title='Password'
				value={user.password}
				onChangeHandler={passwordHandler}
			/>
			<Button
				title={userLocate ? 'Log In' : 'Sign Up'}
				onClickHandler={clickHandler}
				className={styles.auth_btn}
			/>
		</form>
	);
};
export default AuthForm;
