import { useState, useEffect } from 'react';
import { IBlog } from '../../types/blog';
import styles from './Blog.module.css';
import Modal from '../../UI/Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BLOG_PRICING_ROUTE } from '../../utils/consts';
import { fetchBlogId } from '../../store/blogs/blog-actions';
import { handleFinishBlog } from '../../helpers/firebaseHelpers';
import { selectPersonRole } from '../../store/users/users-selectors';

interface BlogItemProps {
	blog: IBlog;
}

const BlogItem: React.FC<BlogItemProps> = ({ blog }) => {
	const [isFinish, setIsFinish] = useState<boolean>(blog.finish);
	const [isModal, setIsModal] = useState({ active: false, item: '' });

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const personRole = useSelector(selectPersonRole);

	const blogModalHandler = () => {
		if (personRole === 'admin') setIsModal({ active: true, item: '' });
		else if (isFinish) {
			localStorage.setItem('blog', JSON.stringify(blog.chooseSubscription))
			dispatch(fetchBlogId(blog.id as string));
			navigate(BLOG_PRICING_ROUTE);
		}
	};

	const blogFinishHandler = () => {
		setIsFinish(!isFinish);
	};

	useEffect(() => {
		handleFinishBlog(blog.id as string, isFinish);
	}, [isFinish]);

	return (
		<>
			<div className={styles['blog-item']} onClick={blogModalHandler}>
				{!isFinish && (
					<div className={styles['blog-item_finish']}>Coming Soon</div>
				)}
				<div
					className={
						styles[`blog-item_${blog.title.split(' ')[0].toLowerCase()}`]
					}
				></div>
				<div className={styles['blog-item_title']}>{blog.title}</div>
				<div className={styles['blog-item_text']}>{blog.text}</div>
			</div>
			{isModal.active && (
				<Modal active={isModal.active} setActive={setIsModal}>
					<div>
						<div className={styles['admin-title']}>
							FINISH: {blog.title.toUpperCase()}
						</div>
						<div
							className={
								isFinish ? styles['btn-red_finish'] : styles['btn-blue_finish']
							}
							onClick={blogFinishHandler}
						>
							{(!isFinish).toString()}
						</div>
					</div>
				</Modal>
			)}
		</>
	);
};

export default BlogItem;
