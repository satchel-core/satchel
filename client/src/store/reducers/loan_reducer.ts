import * as types from "../actions/types";

const loanInitialState = {
  interestRate: {},
  borrowBalance: {},
};

export const LoanReducer = (state = loanInitialState, action: { type: string; payload: any; }) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_BORROW_INTEREST_RATE:
      return { ...state, interestRate: payload };
    case types.GET_BORROW_BALANCE:
      return { ...state, borrowBalance: payload };
    default:
      return state;
  }
}
