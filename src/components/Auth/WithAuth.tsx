import styles from './Auth.module.css';

interface WithAuthProps {
	img: string;
	title: string;
	locateTitle: string;
}

const WithAuth: React.FC<WithAuthProps> = ({ img, title, locateTitle }) => {
	return (
		<div className={styles['with-auth']}>
			<div className={styles[`with-auth_${img}`]}></div>
			{locateTitle} {title}
		</div>
	);
};
export default WithAuth;
