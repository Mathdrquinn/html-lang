import React from 'react';

export const PENDING = 'PENDING';
export const FETCHING = 'FETCHING';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';

export const initLang = { status: PENDING };

export const LangContext = React.createContext(initLang);