import styles from './UserCase.module.css';
import Container from '../../UI/Container/Container';
import { IBlog } from '../../types/blog';
import UserCaseItem from './UserCaseItem';

interface UserCaseListProps {
	blogs: IBlog[];
}

const UserCaseList: React.FC<UserCaseListProps> = ({ blogs }) => {
	return (
		<Container className={styles['user-case_list']}>
			{!blogs.length && (
				<h1 className={styles['user-case_list_loading']}>Empty</h1>
			)}
			{blogs
				.sort((x, y) => x.title.localeCompare(y.title))
				.map((blog: IBlog) => (
					<UserCaseItem userCaseBlog={blog} key={blog.title} />
				))}
		</Container>
	);
};
export default UserCaseList;
