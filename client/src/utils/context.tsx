import React from 'react';

export type contextType = {
    name: string,
    address: string,
    schoolAddress: string,
}

export const initialContext : contextType = {
    name: "",
    address: "0x3a3A6677553Bad5AE99cCDB64e714E54744A4bb3",
    schoolAddress: "",
}

export const Context = React.createContext(initialContext);