import React, { useReducer } from 'react';
import Store from './store';
import { exampleReducer, _user, userReducer, _content, contentReducer } from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [example, exampleDispatch] = useReducer(exampleReducer, 1);
    const [user, userDispatch] = userReducer(userReducer, _user);
    const [content, contentDispatch] = useReducer(contentReducer, _content);

    return (
        <Store.Provider value={ { example, exampleDispatch, user, userDispatch, content, contentDispatch } }>
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;