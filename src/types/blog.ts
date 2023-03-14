interface IDiscount {
	isDiscount: boolean;
	percentNum: number;
}

export interface ISubscription {
	title: string;
	text: string;
	price: number;
	subopportunity: string;
	opportunity: string[];
}

export interface IBlog {
	id?: string;
	blogId: string;
	title: string;
	text: string;
	finish: boolean;
	discount: IDiscount;
	chooseSubscription: ISubscription[];
}


export enum BlogTypeAction {
	FETCH_BLOGS = 'FETCH_BLOGS',
	FINISH_DEVELOP = 'FINISH_DEVELOP',
	FETCH_BLOG_ID = 'FETCH_BLOG_ID',
}

interface fetchBlogs {
	type: BlogTypeAction.FETCH_BLOGS;
	payload: IBlog[];
}

interface finishDevelop {
	type: BlogTypeAction.FINISH_DEVELOP;
	payload: string;
}

interface fetchBlogId {
	type: BlogTypeAction.FETCH_BLOG_ID;
	payload: string;
}

export type BlodActions = fetchBlogs | finishDevelop | fetchBlogId;
