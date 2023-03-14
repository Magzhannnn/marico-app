import styles from './Blog.module.css';
import BlogList from './BlogList';

const BlogPage = () => {
	return (
		<div className={styles.blog}>
			<div className={styles['blog-title']}>Content Sources</div>
			<div className={styles['blog-text']}>
				Connect these sources to your Marico homepage.
			</div>
			<BlogList />
		</div>
	);
};

export default BlogPage;
