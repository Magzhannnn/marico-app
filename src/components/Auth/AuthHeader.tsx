import styles from './Auth.module.css';

interface AuthHeaderProps {
	userLocate: boolean;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ userLocate }) => {
	return (
		<>
			<div className={styles['auth-title']}>
				{userLocate ? 'Log in' : 'Sign up'}
			</div>
			<div className={styles['auth-text']}>
				{userLocate
					? 'Login into existing account.'
					: 'Fill all field for create an account.'}
			</div>
		</>
	);
};
export default AuthHeader;
