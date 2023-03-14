import styles from './Navbar.module.css';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
	ABOUT_ROUTE,
	BLOG_ROUTE,
	PRICING_ROUTE,
	LOGIN_ROUTE,
	SIGN_ROUTE,
	ADMIN_ROUTE,
	USER_CASE_ROUTE,
} from '../../utils/consts';
import Container from '../../UI/Container/Container';
import Button from '../../UI/Button/Button';
import { localStorageLogOut } from '../../helpers/localStorage';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllProducts } from '../../store/product/product-selectors';
import { selectPersonData } from '../../store/users/users-selectors';
import { filterConcatProducts } from '../../helpers/productValid';
import { fetchProduct } from '../../store/product/product-action';
import { handleAddBlogPricePerson } from '../../helpers/firebaseHelpers';

const Navbar = () => {
	const dispatch = useDispatch();
	const products = useSelector(selectAllProducts);
	const person = useSelector(selectPersonData);

	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
	const [role, setRole] = useState(localStorage.getItem('role'));
	const navigate = useNavigate();
	const location = useLocation();

	const logOutHandler = () => {
		console.log(person)
		handleAddBlogPricePerson(person.id as string, person.blogItem);
		dispatch(fetchProduct(filterConcatProducts(products, person.f_prod)));
		navigate(LOGIN_ROUTE);
		localStorageLogOut();
	};

	useEffect(() => {
		setRole(localStorage.getItem('role'));
		setIsAuth(localStorage.getItem('isAuth'));
	}, [location]);

	return (
		<Container className={styles.navbar}>
			<div className={styles.navbar_left}></div>
			{isAuth === 'true' && (
				<div className={styles.navbar_center}>
					<Link to={USER_CASE_ROUTE} className={styles.navbar_link}>
						User case
					</Link>
					<Link to={ABOUT_ROUTE} className={styles.navbar_link}>
						About
					</Link>{' '}
					<Link to={BLOG_ROUTE} className={styles.navbar_link}>
						Blog
					</Link>{' '}
					<Link to={PRICING_ROUTE} className={styles.navbar_link}>
						Pricing
					</Link>{' '}
					{role === 'admin' && (
						<Link to={ADMIN_ROUTE} className={styles.navbar_link}>
							View
						</Link>
					)}
				</div>
			)}
			<div className={styles.navbar_right}>
				{isAuth === 'true' ? (
					<Button title='Logout' onClickHandler={logOutHandler} />
				) : (
					<>
						<Link to={LOGIN_ROUTE} className={styles.navbar_link}>
							Login
						</Link>{' '}
						<Button
							title='Sign Up'
							onClickHandler={() => navigate(SIGN_ROUTE)}
						/>
					</>
				)}
			</div>
		</Container>
	);
};
export default Navbar;
