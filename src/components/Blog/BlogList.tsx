import { useEffect, useState } from 'react';
import styles from './Blog.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { blogData } from '../../helpers/blogData';
import BlogItem from './BlogItem';
import Container from '../../UI/Container/Container';
import { IBlog } from '../../types/blog';
import { selectAllBlogs } from '../../store/blogs/blog-selectors';
import { fetchData } from '../../helpers/firebaseHelpers';
import { fetchBlogs } from '../../store/blogs/blog-actions';

const BlogList = () => {
	const dispatch = useDispatch();
	const blogs: IBlog[] = useSelector(selectAllBlogs);

	const blogsDataFunc = async () => {
		const blogsData = await fetchData('blogs');
		dispatch(fetchBlogs(blogsData));
	};

	useEffect(() => {
		blogsDataFunc();
	}, [blogs]);

	return (
		<Container className={styles['blog-list']}>
			{!blogs.length && (
				<h1 className={styles['blog-list_loading']}>Loading...</h1>
			)}
			{blogs
				.sort((x, y) => x.title.localeCompare(y.title))
				.map((blog: IBlog) => (
					<BlogItem blog={blog} key={blog.title} />
				))}
		</Container>
	);
};

export default BlogList;
