import React, { Dispatch } from 'react';

type contextType = {
    name: string,
    address: string,
    schoolAddress: string,
    asset: string,
	setAsset: any, // TODO: Fix this
    amount: number,
}

export const initialContext : contextType = {
	name: "",
	address: "0x3a3A6677553Bad5AE99cCDB64e714E54744A4bb3",
	schoolAddress: "",
	asset: "",
	setAsset: () => {},
	amount: 0,
}

export const Context = React.createContext(initialContext);
