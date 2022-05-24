import * as types from '../actions/types';

export type userType = {
	interestRates: any;
	tokenBalances: any;
	balance: number;
};

const userInitialState: userType = {
	interestRates: {
		DAI: 0,
		USDC: 0,
		WETH: 0,
	},
	tokenBalances: {
		DAI: 0,
		USDC: 0,
		WETH: 0,
	},
	balance: 0.0,
};

export const userReducer = (
	state: userType = userInitialState,
	action: { type: string; payload: any },
) => {
	const { type, payload } = action;
	switch (type) {
		case types.GET_INTEREST_RATES:
			return { ...state, interestRates: payload };
		case types.GET_USER_TOKEN_BALANCE:
			return { ...state, tokenBalances: payload };
		case types.GET_USER_TOTAL_BALANCE:
			return { ...state, balance: payload };
		default:
			return state;
	}
};

// const INITIAL_STATE = {
//   address: "",
//   name: "",
//   contractAddress: "",
//   balance: {},
//   contribution: 0,
//   interestRate: 0,
//   depositLoading: false,
//   withdrawLoading: false,
//   totalBalance: 0,
//   assetPrices: {},
// };

// export default function (state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case types.LOGIN_USER_SUCCESS:
//       return { ...INITIAL_STATE, ...action.payload };
//     case types.LOGOUT_USER:
//       return INITIAL_STATE;
//     case types.GET_NAME:
//       return { ...state, name: action.payload };
//     case types.GET_BALANCE: {
//       return {
//         ...state,
//         balance: action.payload,
//         depositLoading: false,
//         withdrawLoading: false,
//       };
//     }
//     case types.GET_CONTRIBUTION: {
//       return { ...state, contribution: action.payload };
//     }
//     case types.GET_INTEREST_RATE:
//       return { ...state, interestRate: action.payload };
//     case types.LOAD_DEPOSIT:
//       return { ...state, depositLoading: true };
//     case types.LOAD_WITHDRAW:
//       return { ...state, withdrawLoading: true };
//     case types.GET_TOTAL_BALANCE:
//       return { ...state, totalBalance: action.payload };
//     case types.GET_ASSET_PRICES:
//       return { ...state, assetPrices: action.payload };
//     default:
//       return state;
//   }
// }

export {};
