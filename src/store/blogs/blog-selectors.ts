import { RootState } from './../rootReducer';

export const selectAllBlogs = (state: RootState) => state.blogs.blog;

export const selectBlogId = (state: RootState) => state.blogs.selectBlogId;

export const selectBlog = (state: RootState, selectBlogId: string) =>
	state.blogs.blog.filter(blogItem => blogItem.id === selectBlogId);
