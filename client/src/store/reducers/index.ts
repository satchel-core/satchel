import { combineReducers } from 'redux';
import { loanReducer } from './loan_reducer';
import { schoolReducer } from './school_reducer';
import { userReducer } from './user_reducer';
import { orgReducer } from './org_reducer';
import { HYDRATE } from 'next-redux-wrapper';

const combinedReducers = combineReducers({
	loan: loanReducer,
	school: schoolReducer,
	user: userReducer,
	org: orgReducer,
});

export const rootReducer = (state, action) => {
	if (action.type === HYDRATE) {
		const nextState = {
			...state, // use previous state
			org: action.payload.org, // on hydrate, overwrite org with stored value
		};
		// if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
		return nextState;
	} else {
		return combinedReducers(state, action);
	}
};
