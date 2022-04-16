import { combineReducers } from 'redux';
import { LoanReducer } from './loan_reducer';
import { schoolReducer } from './school_reducer';
import { userReducer } from './user_reducer';

const reducers = {
	loan: LoanReducer,
	school: schoolReducer,
	user: userReducer,
};

export const rootReducer = combineReducers(reducers);
