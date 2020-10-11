import React, { useReducer } from 'react';
import Store from './Store';
import { _session, sessionReducer, _globalState, globalStateReducer, _selectAddressState, selectAddressStateReducer} from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [session, sessionDispatch] = useReducer(sessionReducer, _session);
    const [globalState, globalStateDispatch] = useReducer(globalStateReducer, _globalState);
    const [selectAddressState, selectAddressStateDispatch] = useReducer(selectAddressStateReducer, _selectAddressState);

    return (
        <Store.Provider value={ { session, sessionDispatch, globalState, globalStateDispatch, selectAddressState, selectAddressStateDispatch } }>
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;