import React, { useReducer } from 'react';
import Store from './Store';
import { _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer } from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [session, sessionDispatch] = useReducer(sessionReducer, _session);
    const [globalState, globalStateDispatch] = useReducer(globalStateReducer, _globalState);
    const [addressValue, addressValueDispatch] = useReducer(addressValueReducer, _addressValue);
    const [modalState, modalStateDispatch] = useReducer(modalStateReducer, _modalState);

    return (
        <Store.Provider value={ {
            session, sessionDispatch, globalState, globalStateDispatch, addressValue, addressValueDispatch, modalState, modalStateDispatch,
            } }>
                
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;