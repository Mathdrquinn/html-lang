import React, { useState, useMemo } from 'react';
import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption } from "@reach/combobox";import "@reach/combobox/styles.css";
import { LangContext, SUCCESS } from "../context/lang.context"
import { useContext } from "react"
import { useThrottle } from 'react-use';

export const DisplayLang = () => {
    const lang = useContext(LangContext);
    const [term, setTerm] = useState('');
    const throttledTerm = useThrottle(term, 150);
    const matchingTags = useMemo(() => {
        if(lang.status !== SUCCESS)
            return [];
        if(lang.status === SUCCESS && throttledTerm.trim() === '')
            return Object.keys(lang.data.language)
            .map(k => lang.data.language[k])
            .slice(0, 8);
        return Object.keys(lang.data.language)
        .map(k => lang.data.language[k])
        .filter(tag => tag.Description.toLowerCase().includes(throttledTerm.toLowerCase()) || tag.Subtag.toLowerCase().includes(throttledTerm.toLowerCase()))
        .slice(0, 8)
    }, [throttledTerm, lang])

    if (lang.status !== SUCCESS)
        return `⌚`;

    return (
        <>
            <h4 id="demo">Fidn and select a language</h4>
            <Combobox>
                <ComboboxInput
                    aria-labelledby="demo"
                    onChange={event => setTerm(event.target.value)}
                />
                <ComboboxPopover>
                    <ComboboxList aria-labelledby="demo">
                        {
                            matchingTags
                             .map(tag => (
                                <ComboboxOption key={tag.Subtag} value={`${tag.Subtag} | ${tag.Description}`}>
                                </ComboboxOption>
                             ))
                        }
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </>
    )
}
