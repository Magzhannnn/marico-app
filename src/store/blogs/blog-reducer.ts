import { IBlog, BlodActions, BlogTypeAction } from './../../types/blog';

interface InitialStateProps {
	blog: IBlog[];
	selectBlogId: string;
}

const initialState: InitialStateProps = {
	blog: [],
	selectBlogId: '',
};

export const blogsReducer = (
	state = initialState,
	action: BlodActions
): InitialStateProps => {
	switch (action.type) {
		case BlogTypeAction.FETCH_BLOGS:
			return { ...state, blog: action.payload };
		case BlogTypeAction.FINISH_DEVELOP:
			return {
				...state,
				blog: state.blog.map(blog =>
					blog.blogId === action.payload
						? { ...blog, finish: !blog.finish }
						: blog
				),
			};
		case BlogTypeAction.FETCH_BLOG_ID:
			return { ...state, selectBlogId: action.payload };
		default:
			return state;
	}
};
