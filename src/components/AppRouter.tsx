import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { authRouter, publicRouter, adminRouter, sellerRouter } from '../router';
import { useState, useEffect } from 'react';
import { ABOUT_ROUTE, SIGN_ROUTE } from '../utils/consts';

const AppRouter = () => {
	const location = useLocation();
	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
	const [role, setRole] = useState(localStorage.getItem('role'));

	useEffect(() => {
		setIsAuth(localStorage.getItem('isAuth'));
		setRole(localStorage.getItem('role'));
	}, [location]);

	return (
		<Routes>
			{isAuth === 'true' ? (
				<>
					{publicRouter.map(({ path, Component }) => (
						<Route path={path} key={path} element={<Component />} />
					))}
					{role === 'admin' && (
						<Route
							path={adminRouter.path}
							key={adminRouter.path}
							element={<adminRouter.Component />}
						/>
					)}
					{role === 'seller' && (
						<Route
							path={sellerRouter.path}
							key={sellerRouter.path}
							element={<sellerRouter.Component />}
						/>
					)}
					<Route path='/*' element={<Navigate to={ABOUT_ROUTE} />} />
				</>
			) : (
				<>
					{authRouter.map(({ path, Component }) => (
						<Route path={path} key={path} element={<Component />} />
					))}
					<Route path='/*' element={<Navigate to={SIGN_ROUTE} />} />
				</>
			)}
		</Routes>
	);
};
export default AppRouter;
