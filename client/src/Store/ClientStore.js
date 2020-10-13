import React, { useReducer } from 'react';
import Store from './Store';
import { _session, sessionReducer, _globalState, globalStateReducer, _selectAddressValue, selectAddressValueReducer} from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [session, sessionDispatch] = useReducer(sessionReducer, _session);
    const [globalState, globalStateDispatch] = useReducer(globalStateReducer, _globalState);
    const [selectAddressValue, selectAddressValueDispatch] = useReducer(selectAddressValueReducer, _selectAddressValue);

    return (
        <Store.Provider value={ { session, sessionDispatch, globalState, globalStateDispatch, selectAddressValue, selectAddressValueDispatch } }>
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;