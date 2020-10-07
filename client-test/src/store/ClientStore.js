import React, { useReducer } from 'react';
import Store from './store';
import { _info, _content, contentReducer, infoReducer, exampleReducer, pageReducer } from './clientReducer';

function ClientStore(props) {
    // const ..Reducer = (state, { type, payload }) => '';

    const [example, exampleDispatch] = useReducer(exampleReducer, 1);
    const [content, contentDispatch] = useReducer(contentReducer, _content);
    
    const [info, infoDispatch] = useReducer(infoReducer, _info);
    const [page, pageDispatch] = useReducer(pageReducer, 'writeInfo');
    // const [ .. , ..Dispatch] = useReducer( Reducer, '');

    return (
        <Store.Provider value={ { example, exampleDispatch, info, infoDispatch, content, contentDispatch, page, pageDispatch, } }>
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;