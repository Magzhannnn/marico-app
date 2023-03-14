import styles from './About.module.css';
import Button from '../../UI/Button/Button';

const AboutBody = () => {
	return (
		<div className={styles['about-body']}>
			<div className={styles['about-body_title']}>
				Turn your audience into email and text message subscribers.
			</div>
			<div className={styles['about-body_btns']}>
				<Button
					className={styles['about-body_btn']}
					title={'Get Started Now'}
				/>
				<Button className={styles['about-body_btn_black']} title={'View A Demo'} />
			</div>
		</div>
	);
};
export default AboutBody;
