import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Container from '../UI/Container/Container';
import { LOGIN_ROUTE } from '../utils/consts';
import { useSelector } from 'react-redux';
import { selectAllUsers } from '../store/users/users-selectors';

import AuthFooter from '../components/Auth/AuthFooter';
import AuthForm from '../components/Auth/AuthForm';
import AuthHeader from '../components/Auth/AuthHeader';

const Auth = () => {
	const [loadData, setLoadData] = useState(localStorage.getItem('loadData'));
	const [loading, setLoading] = useState(false);
	const users = useSelector(selectAllUsers);

	const location = useLocation();
	const userLocate = location.pathname === LOGIN_ROUTE;

	const loadingHandler = () => {
		setLoading(true);
	};

	const loadingNoHandler = () => {
		setLoading(false);
	};

	useEffect(() => {
		localStorage.setItem('loadData', 'false');
		if (loadData === 'true') {
			alert('ERROR! Please refresh the page to save your data!!!');
		}
		setLoadData(localStorage.getItem('loadData'));
	}, []);

	return (
		<Container>
			{loading ? (
				<h1 className='text-center text-6xl mt-10'>Loading...</h1>
			) : (
				<>
					<AuthHeader userLocate={userLocate} />
					<AuthForm
						users={users}
						userLocate={userLocate}
						loadingHandler={loadingHandler}
						loadingNoHandler={loadingNoHandler}
					/>
					<AuthFooter userLocate={userLocate} />
				</>
			)}
		</Container>
	);
};
export default Auth;
