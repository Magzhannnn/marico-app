import { BlogTypeAction, IBlog } from './../../types/blog';

export const fetchBlogs = (blogs: IBlog[]) => ({
	type: BlogTypeAction.FETCH_BLOGS,
	payload: blogs,
});

export const finishDevlop = (blogId: string) => ({
	type: BlogTypeAction.FINISH_DEVELOP,
	payload: blogId,
});

export const fetchBlogId = (id: string) => ({
	type: BlogTypeAction.FETCH_BLOG_ID,
	payload: id,
});
