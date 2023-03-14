import { blogsReducer } from './blogs/blog-reducer';
import { combineReducers } from 'redux';
import { usersReducer } from './users/users-reducer';
import { devBrandReducer } from './devices_brands/d_b-reducer';
import { productsReducer } from './product/product-reducer';

export const rootReducer = combineReducers({
	users: usersReducer,
	devBrand: devBrandReducer,
	products: productsReducer,
	blogs: blogsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
