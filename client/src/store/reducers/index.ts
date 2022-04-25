import { combineReducers } from 'redux';
import { loanReducer } from './loan_reducer';
import { schoolReducer } from './school_reducer';
import { userReducer } from './user_reducer';
import { orgReducer } from './org_reducer';

const reducers = {
	loan: loanReducer,
	school: schoolReducer,
	user: userReducer,
	org: orgReducer,
};

export const rootReducer = combineReducers(reducers);
