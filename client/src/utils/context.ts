import React from 'react';
import { ContextData } from '../store/contextData';

export const StateContext = React.createContext<ContextData>({ loans: null });
export const DispatchContext = React.createContext<ContextData>({ loans: null });