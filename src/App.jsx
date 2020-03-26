import React, { useEffect, useState } from 'react';
import './App.css';
import { langString } from './data/lang';
import { LangContext, initLang, FETCHING, ERROR, SUCCESS } from './context/lang.context';
import { DisplayLang } from './container/DisplayLang.component';

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
    <LangContext.Provider value={lang}>
      <DisplayLang></DisplayLang>
    </LangContext.Provider>
  );
}

export default App;
