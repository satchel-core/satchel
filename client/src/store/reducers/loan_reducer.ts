import * as types from "../actions/types";

export const loanInitialState = {
  interestRate: {},
  borrowBalance: {},
};

export const LoanReducer = (state: any, action: { type: string; payload: any; }) => {
  switch (action.type) {
    case types.GET_BORROW_INTEREST_RATE:
      return { ...state, interestRate: action.payload };
    case types.GET_BORROW_BALANCE:
      return { ...state, borrowBalance: action.payload };
    default:
      return state;
  }
}
