import * as types from '../actions/types';

// TODO: Change this from hardcode

export type schoolType = {
	name: string;
	address: string;
	loginLoading: boolean;
	deployLoading: boolean;
	withdrawLoading: boolean;
	tokenBalances: any;
	balance: Number;
};

const schoolInitialState: schoolType = {
	name: 'SOME SCHOOL',
	address: '0x3a3A6677553Bad5AE99cCDB64e714E54744A4bb3',
	loginLoading: false,
	deployLoading: false,
	withdrawLoading: false,
	tokenBalances: {},
	balance: 0.0,
};

export const schoolReducer = (
	state: schoolType = schoolInitialState,
	action: { type: string; payload: any },
) => {
	const { type, payload } = action;
	switch (type) {
		case types.SET_SCHOOL_INFO: {
			return {
				...state,
				name: payload.name,
				address: payload.address,
			};
		}
		case types.SET_SCHOOL_BALANCE: {
			return { ...state, balance: payload };
		}
		case types.SET_TOKEN_BALANCES: {
			return { ...state, tokenBalances: payload };
		}
		default:
			return state;
	}
};
