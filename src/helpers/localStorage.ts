import { IUser } from '../types/users';

export const localStorageUsers = (user: IUser) => {
	localStorage.setItem('user', JSON.stringify(user));
	localStorage.setItem('isAuth', 'true');
	localStorage.setItem('role', user.role);
	localStorage.setItem('userId', user.userId as string);
};

export const localStorageLogOut = () => {
	localStorage.removeItem('user');
	localStorage.removeItem('isAuth');
	localStorage.removeItem('role');
	localStorage.removeItem('userId');
	localStorage.removeItem('blog');
	localStorage.setItem('loadData', 'true');
};
