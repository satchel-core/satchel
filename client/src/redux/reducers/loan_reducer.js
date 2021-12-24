import * as types from "../types";

const INITIAL_STATE = {
  interestRate: {},
  borrowBalance: {},
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.GET_BORROW_INTEREST_RATE:
      return { ...state, interestRate: action.payload };
    case types.GET_BORROW_BALANCE:
      return { ...state, borrowBalance: action.payload };
    default:
      return state;
  }
}
