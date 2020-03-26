import React, { useState, useMemo } from 'react';
import {  Combobox,  ComboboxInput,  ComboboxPopover,  ComboboxList,  ComboboxOption, ComboboxOptionText } from "@reach/combobox";import "@reach/combobox/styles.css";
import { LangContext, SUCCESS } from "../context/lang.context"
import { useContext } from "react"

export const DisplayLang = () => {
    const [term, setTerm] = useState('');
    const lang = useContext(LangContext);
    const matchingTags = useMemo(() => {
        if(lang.status !== SUCCESS)
            return [];
        return Object.keys(lang.data.language)
        .map(k => lang.data.language[k])
        .filter(tag => tag.Description.toLowerCase().includes(term.toLowerCase()) || tag.Subtag.toLowerCase().includes(term.toLowerCase()))
        .slice(0, 8)
    }, [term, lang])

    if (lang.status !== SUCCESS)
        return `⌚`;

    return (
        <>
            <h4 id="demo">Basic, Fixed List Combobox</h4>
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
            <pre>{JSON.stringify(lang, null, 4)}</pre>
        </>
    )
}
