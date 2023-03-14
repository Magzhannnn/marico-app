import styles from './About.module.css';

const AboutHeader = () => {
	return (
		<div className={styles['about-header']}>
			Own your audience.
			<span className={styles['about-header_change']}>
				So you don't lose them.
			</span>
		</div>
	);
};
export default AboutHeader;
