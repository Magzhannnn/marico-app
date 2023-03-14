import styles from './Auth.module.css';
import { useNavigate } from 'react-router-dom';
import authData from '../../data/auth-data.json';
import { SIGN_ROUTE, LOGIN_ROUTE } from '../../utils/consts';
import WithAuth from './WithAuth';

interface AuthFooterProps {
	userLocate: boolean;
}

const AuthFooter: React.FC<AuthFooterProps> = ({ userLocate }) => {
	const navigate = useNavigate();
	
	const navigateHandler = () => {
		if (userLocate) navigate(SIGN_ROUTE);
		else navigate(LOGIN_ROUTE);
	};

	return (
		<>
			<div className={styles.other_auth}>
				<span className={styles.other_auth_span}>or</span> <br />
				{userLocate ? 'Log in with...' : 'Sign up with...'}
			</div>
			<div className={styles['other-auth_items']}>
				{authData.map((item, index) => (
					<WithAuth
						key={`img_${index}`}
						img={item.img}
						title={item.title}
						locateTitle={userLocate ? 'Log in with' : 'Sign up with'}
					/>
				))}
			</div>
			<div className={styles.auth_foot} onClick={navigateHandler}>
				{userLocate
					? 'Don’t have an account? Create One.'
					: 'Already have an account? Please Log in.'}
			</div>
		</>
	);
};
export default AuthFooter;
