import { IBlog } from '../../types/blog';
import styles from './UserCase.module.css';

interface UserCaseItemProps {
	userCaseBlog: IBlog;
}

const UserCaseItem: React.FC<UserCaseItemProps> = ({ userCaseBlog }) => {
	return (
		<>
			<div className={styles['user-case_item']}>
				<div className={styles['user-case_item_finish']}>
					{userCaseBlog.chooseSubscription[0].title}
				</div>
				<div
					className={
						styles[
							`user-case_item_${userCaseBlog.title.split(' ')[0].toLowerCase()}`
						]
					}
				></div>
				<div className={styles['user-case_item_title']}>
					{userCaseBlog.title}
				</div>
				<div className={styles['user-case_item_text']}>{userCaseBlog.text}</div>
			</div>
		</>
	);
};
export default UserCaseItem;
