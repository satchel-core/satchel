import * as types from '../actions/types';

const orgInitialState = {
	org: {},
	schools: [],
};

export const orgReducer = (state = orgInitialState, action: { type: string; payload: any }) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_SCHOOL_BY_ORG:
			return { ...state, schools: payload };
		case types.GET_ORG_INFO:
			return { ...state, org: payload };
		default:
			return state;
	}
};
