import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './App.module.css';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar/Navbar';
import { fetchData } from './helpers/firebaseHelpers';
import { fetchUsers } from './store/users/users-actions';
import { personDataForm } from './store/users/users-actions';
import { useLocation } from 'react-router-dom';
import {
	selectAllUsers,
	selectPersonData,
} from './store/users/users-selectors';
import { PRICING_ROUTE } from './utils/consts';
import { fetchBlogs } from './store/blogs/blog-actions';
import { fetchProduct } from './store/product/product-action';
import { fetchBrand, fetchDevice } from './store/devices_brands/d_b-actions';

function App() {
	const users = useSelector(selectAllUsers);
	// const [user, setUser] = useState(localStorage.getItem('user'));
	const dispatch = useDispatch();
	const location = useLocation();

	const personData = useSelector(selectPersonData);

	const personDataFunc = async () => {
		const userData = await fetchData('users');
		console.log(userData);
		dispatch(fetchUsers(userData));
	};

	const deviceDataFunc = async () => {
		const deviceData = await fetchData('devices');
		dispatch(fetchDevice(deviceData));
	};

	const brandDataFunc = async () => {
		const brandData = await fetchData('brands');
		dispatch(fetchBrand(brandData));
	};

	const productsDataFunc = async () => {
		const productsData = await fetchData('products');
		dispatch(fetchProduct(productsData));
	};

	const blogsDataFunc = async () => {
		const blogsData = await fetchData('blogs');
		dispatch(fetchBlogs(blogsData));
	};

	useEffect(() => {
		personDataFunc();
		deviceDataFunc();
		brandDataFunc();
		productsDataFunc();
		blogsDataFunc();
	}, [dispatch]);

	useEffect(() => {
		dispatch(
			personDataForm(JSON.parse(localStorage.getItem('user') as string))
		);
	}, [location]);

	useEffect(() => {
		if (location.pathname === PRICING_ROUTE) {
			deviceDataFunc();
			brandDataFunc();
		}
	}, [location]);

	// console.log(users);

	return (
		<div className={styles.app}>
			<Navbar />
			<AppRouter />
		</div>
	);
}

export default App;
