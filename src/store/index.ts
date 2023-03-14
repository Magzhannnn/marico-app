import { rootReducer } from './rootReducer';
import { createStore } from 'redux';

export const configureStore = () => {
	return createStore(rootReducer);
};
