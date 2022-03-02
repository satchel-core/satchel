import * as types from "../actions/types";

// TODO: Change this from hardcode

export type schoolType = {
    name: string,
    address: string,
    loginLoading: boolean,
    deployLoading: boolean,
    withdrawLoading: boolean,
    tokenBalances: any,
    balance: Number,
};

const schoolInitialState: schoolType = {
    name: "SOME SCHOOL",
    address: "0x3a3A6677553Bad5AE99cCDB64e714E54744A4bb3",
    loginLoading: false,
    deployLoading: false,
    withdrawLoading: false,
    tokenBalances: {},
    balance: 0,
};

export const schoolReducer = (state: schoolType = schoolInitialState, action: { type: string; payload: any; }) => {
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
            return {...state, tokenBalances: payload }
        }
        default:
            return state;
    }
}

// import * as types from "../actions/types";

// const INITIAL_STATE = {
//   name: "",
//   address: "",
//   projects: [],
//   balance: {},
//   loginLoading: false,
//   deployLoading: false,
//   withdrawLoading: false,
//   error: "",
// };

// export default function (state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case types.GET_SCHOOL_INFO: {
//       return {
//         ...state,
//         name: action.payload.name,
//         address: action.payload.address,
//       };
//     }
//     case types.GET_SCHOOL_PROJECTS: {
//       return { ...state, projects: action.payload };
//     }
//     case types.SET_SCHOOL_BALANCE: {
//       return { ...state, balance: action.payload, withdrawLoading: false };
//     }
//     case types.LOAD_CREATE_SCHOOL: {
//       return { ...state, deployLoading: true };
//     }
//     case types.LOAD_LOGIN_SCHOOL: {
//       return { ...state, loginLoading: true };
//     }
//     case types.LOAD_SCHOOL_WITHDRAW: {
//       return { ...state, withdrawLoading: true };
//     }
//     case types.SCHOOL_LOGIN_ERROR: {
//       return {
//         ...state,
//         loginLoading: false,
//         deployLoading: false,
//         error: action.payload,
//       };
//     }
//     case types.LOGOUT_USER: {
//       return INITIAL_STATE;
//     }
//     default:
//       return state;
//   }
// }

export { }