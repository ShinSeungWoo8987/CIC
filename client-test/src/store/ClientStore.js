import React, { useReducer } from 'react';
import Store from './store';
import { _content, contentReducer, exampleReducer } from './clientReducer';

function ClientStore(props) {
    // const ..Reducer = (state, { type, payload }) => '';

    const [content, contentDispatch] = useReducer(contentReducer, _content);
    const [example, exampleDispatch] = useReducer(exampleReducer, 1);
    // const [ .. , ..Dispatch] = useReducer( Reducer, '');

    return (
        <Store.Provider value={ { content, contentDispatch, example, exampleDispatch } }>
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;