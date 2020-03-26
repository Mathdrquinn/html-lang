import React from 'react';
import { LangContext } from "../context/lang.context"
import { useContext } from "react"

export const DisplayLang = () => {
    const lang = useContext(LangContext);
    return <pre>{JSON.stringify(lang, null, 4)}</pre>
}