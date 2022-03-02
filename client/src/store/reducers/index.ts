import { combineReducers } from 'redux';
import {LoanReducer} from './loan_reducer';
import {schoolReducer} from './school_reducer';

const reducers = {
    loan: LoanReducer,
    school: schoolReducer
}

export const rootReducer = combineReducers(reducers);
