import React, { useReducer } from 'react';
import Store from './Store';
import { _user, userReducer, _session, sessionReducer} from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [user, userDispatch] = useReducer(userReducer, _user);
    const [session, sessionDispatch] = useReducer(sessionReducer, _session);

    return (
        <Store.Provider value={ { user, userDispatch, session, sessionDispatch } }>
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;