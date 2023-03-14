import { useState, useEffect } from 'react';
import styles from './Blog.module.css';
import { useNavigate } from 'react-router-dom';
import { BLOG_ROUTE } from '../../utils/consts';
import { useSelector } from 'react-redux';
import BlogSubcsription from './BlogSubcsription';
import { RootState } from '../../store/rootReducer';
import Container from '../../UI/Container/Container';
import { selectBlog, selectBlogId } from '../../store/blogs/blog-selectors';

import { useLocation } from 'react-router-dom';
import { ISubscription } from '../../types/blog';

const BlogPricing = () => {
	const navigate = useNavigate();
	const location = useLocation();

	const [subscription, setSubscription] = useState(
		JSON.parse(localStorage.getItem('blog') as string)
	);
	useEffect(() => {
		setSubscription(JSON.parse(localStorage.getItem('blog') as string));
	}, [location]);

	useEffect(() => {
		console.log(subscription);
	}, [subscription]);

	const blogId = useSelector(selectBlogId);
	const blog = useSelector((state: RootState) => selectBlog(state, blogId));

	return (
		<Container>
			<div
				className={styles['blog-pricing_back']}
				onClick={() => navigate(BLOG_ROUTE)}
			>
				⇦
			</div>
			<div className={styles['choose_items']}>
				{subscription.map((blogSubscription: ISubscription, index: number) => (
					<BlogSubcsription
						key={`blog_${index}`}
						subscription={blogSubscription}
						blog={blog[0]}
					/>
				))}
				{/* <div className={styles['choose_item']}>Personal</div>
				<div className={styles['choose_item']}>Pro</div>
				<div className={styles['choose_item']}>Expert</div> */}
			</div>
		</Container>
	);
};
export default BlogPricing;
