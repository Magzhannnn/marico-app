import styles from './About.module.css';

const AboutFooter = () => {
	return (
		<div className={styles['about-footer']}>
			<div className={styles['about-footer_dot']}></div>
			<div className={styles['about-footer_number']}>1000+</div>
			<div className={styles['about-footer_text']}>
				creators have already started
			</div>
		</div>
	);
};
export default AboutFooter;
