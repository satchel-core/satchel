import { createStore, applyMiddleware, compose } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';

export type RootState = ReturnType<typeof store.getState>;

const initialState = {};

export const store = createStore(
	rootReducer,
	initialState,
	compose(
		applyMiddleware(thunk), //Applying redux-thunk middleware
	),
);

const makeStore = () => store;
export const wrapper = createWrapper(makeStore);
