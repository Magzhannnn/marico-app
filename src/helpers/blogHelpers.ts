import { IBlog, ISubscription } from '../types/blog';

export const blogPriceBuy = (blog: IBlog, subItem: ISubscription) => ({
	...blog,
	chooseSubscription: blog.chooseSubscription.filter(
		sub => sub.title === subItem.title
	),
});

export const searchDublicateBlogItem = (blog: IBlog[], newBlog: IBlog) => {
	for (const blogItem of blog)
		if (blogItem.blogId === newBlog.blogId)
			return blog.map(blogItem =>
				blogItem.blogId === newBlog.blogId
					? { ...blogItem, chooseSubscription: newBlog.chooseSubscription }
					: blogItem
			);
	return [...blog, newBlog];
};

export const uniqueUnionBlogData = (
	personBlogItem: IBlog[],
	localStoreBlogItem: IBlog[]
) => {
	const combinedArray = personBlogItem.concat(localStoreBlogItem);

	const res = combinedArray.filter((item, index) => {
		return (
			index ===
			combinedArray.findIndex(obj => {
				return JSON.stringify(obj) === JSON.stringify(item);
			})
		);
	});
	// console.log(combinedArray)
	// console.log(res);
	return res;
};
