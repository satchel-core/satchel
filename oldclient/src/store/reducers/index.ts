import { combineReducers } from 'redux'
import {LoanReducer} from './loan_reducer'

export const rootReducer = combineReducers({
    loan: LoanReducer
});

export type RootState = ReturnType<typeof rootReducer>
