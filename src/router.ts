import Blog from './pages/Blog';
import About from './pages/About';
import AdminView from './pages/AdminView';
import Auth from './pages/Auth';
import Pricing from './pages/Pricing';
import UserCase from './pages/UserCase';
import SellerAddProduct from './pages/SellerAddProduct';
import BlogPricing from './components/Blog/BlogPricing';
import {
	ABOUT_ROUTE,
	ADMIN_ROUTE,
	BLOG_ROUTE,
	LOGIN_ROUTE,
	PRICING_ROUTE,
	SELLER_ROUTE,
	SIGN_ROUTE,
	BLOG_PRICING_ROUTE,
	USER_CASE_ROUTE,
} from './utils/consts';

export interface IRouter {
	path: string;
	Component: () => React.ReactElement;
}

export const authRouter: IRouter[] = [
	{
		path: LOGIN_ROUTE,
		Component: Auth,
	},
	{
		path: SIGN_ROUTE,
		Component: Auth,
	},
];

export const publicRouter: IRouter[] = [
	{
		path: ABOUT_ROUTE,
		Component: About,
	},
	{
		path: BLOG_ROUTE,
		Component: Blog,
	},
	{
		path: PRICING_ROUTE,
		Component: Pricing,
	},
	{
		path: BLOG_PRICING_ROUTE,
		Component: BlogPricing,
	},
	{
		path: USER_CASE_ROUTE,
		Component: UserCase,
	},
];

export const adminRouter: IRouter = {
	path: ADMIN_ROUTE,
	Component: AdminView,
};

export const sellerRouter: IRouter = {
	path: SELLER_ROUTE,
	Component: SellerAddProduct,
};
