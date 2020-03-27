import React, { useEffect, useState } from 'react';
import './App.css';
import { langString } from './data/lang';
import { LangContext, initLang, FETCHING, ERROR, SUCCESS } from './context/lang.context';
import { DisplayLang } from './container/DisplayLang.container.jsx';
import { DisplayExtLang } from './container/DisplayExtLang.container';
import { DisplayScript } from './container/DisplayScript.container';
import { DisplayRegion } from './container/DisplayRegion.container';
import { DisplayVariant } from './container/DisplayVariant.container';

function App() {
  const [lang, setLang] = useState(initLang);

  useEffect(() => {
    setLang({ status: FETCHING });
    new Promise((res, rej) => {
      try {
        return res(
          langString.split('\n%%\n')
          .map(
            tagGroupString => tagGroupString.split('\n')
              .reduce(
                (sum, keyValueString) => {
                  const dilim = keyValueString.indexOf(':');
                  const key = keyValueString.substr(0, dilim);
                  const value = keyValueString.substr(dilim+2, keyValueString.length);
                  return { ...sum, [key]: value };
                },
                {}
              )
          )
          .reduce(
            (sum, tagObj) => {
              const tagKey = tagObj.Type;
              if (!sum[tagKey])
                sum[tagKey] = {}
              sum[tagKey][tagObj.Subtag] = tagObj;
              return sum;
            }, {}
          )
        );
      } catch (e) {
        return rej(e);
      }
    })
        .then(data => {
          console.log(data);
          setLang({ status: SUCCESS, poop: '💩', data })
        })
        .catch(e => {
          console.error(e);
          setLang({ status: ERROR, e })
        });
}, []);

  return (
    <>
    <h1>Constructing Language Tags</h1>
    <p><small>Inspired by <a href="https://www.w3.org/International/articles/language-tags/">w3.org's language article</a></small></p>
    <figure>
      <span style={{color: '#ff00ff'}}>language</span>
      -<span style={{color: '#F90'}}>extlang</span>
      -<span style={{color: '#ff0099'}}>script</span>
      -<span style={{color: '#0099ff'}}>region</span>
      -<span style={{color: '#00ff00'}}>variant</span>
      -<span style={{color: 'rgb(102, 102, 102);'}}>extension</span>
      -<span style={{color: '#800000'}}>privateuse</span>
    </figure>
      <LangContext.Provider value={lang}>
        <ol style={{ listStyleType: 'none', margin: 0, padding: 0, display: 'flex'}}>
          <li style={{ padding: '1rem' }}><DisplayLang></DisplayLang></li>
          <li style={{ padding: '1rem' }}><DisplayExtLang></DisplayExtLang></li>
          <li style={{ padding: '1rem' }}><DisplayScript></DisplayScript></li>
          <li style={{ padding: '1rem' }}> <DisplayRegion></DisplayRegion></li>
          <li style={{ padding: '1rem' }}><DisplayVariant></DisplayVariant></li>
        </ol>
      </LangContext.Provider>
    </>
  );
}

export default App;
