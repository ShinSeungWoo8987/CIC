import React, { useReducer } from 'react';
import Store from './Store';
import { _selectAddressValue, selectAddressValueReducer, loginModalReducer } from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [selectAddressValue, selectAddressValueDispatch] = useReducer(selectAddressValueReducer, _selectAddressValue);
    const [loginModalState, LoginModalDispatch] = useReducer(loginModalReducer, false);

    return (
        <Store.Provider value={ {
            selectAddressValue, selectAddressValueDispatch, loginModalState, LoginModalDispatch
            } }>
                
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;