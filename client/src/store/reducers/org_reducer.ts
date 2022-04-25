import * as types from "../actions/types";

const orgInitialState = {
  org: {},
};

export const orgReducer = (state = orgInitialState, action: { type: string; payload: any; }) => {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
