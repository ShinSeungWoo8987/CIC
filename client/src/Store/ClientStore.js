import React, { useReducer } from 'react';
import Store from './Store';
import { _user, userReducer, _session, sessionReducer, _globalState, globalStateReducer} from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [user, userDispatch] = useReducer(userReducer, _user);
    const [session, sessionDispatch] = useReducer(sessionReducer, _session);
    const [globalState, globalStateDispatch] = useReducer(globalStateReducer, _globalState);

    return (
        <Store.Provider value={ { user, userDispatch, session, sessionDispatch, globalState, globalStateDispatch } }>
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;