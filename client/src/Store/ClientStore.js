import React, { useReducer } from 'react';
import Store from './Store';
import { _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer, _searchProject, searchProjectReducer,
         _pageCnt, pageCntReducer, _projectInformation, projectInformationReducer, boardItemListReducer,
         _viewPage, viewStateReducer, pageReducer, _content, contentReducer, _info, infoReducer } from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [session, sessionDispatch] = useReducer(sessionReducer, _session);
    const [globalState, globalStateDispatch] = useReducer(globalStateReducer, _globalState);
    const [addressValue, addressValueDispatch] = useReducer(addressValueReducer, _addressValue);
    const [modalState, modalStateDispatch] = useReducer(modalStateReducer, _modalState);
    const [searchProject, searchProjectDispatch] = useReducer(searchProjectReducer, _searchProject);
    const [pageCnt, pageCntDispatch] = useReducer(pageCntReducer, _pageCnt);
    const [projectInformation, projectInformationDispatch] = useReducer(projectInformationReducer, _projectInformation)

    const [viewState, viewStateDispatch] = useReducer(viewStateReducer, _viewPage);
    const [content, contentDispatch] = useReducer(contentReducer, _content);
    const [info, infoDispatch] = useReducer(infoReducer, _info);
    const [page, pageDispatch] = useReducer(pageReducer, 'writeInfo');
    const [ boardItemList , boardItemListDispatch] = useReducer( boardItemListReducer, '');

    return (
        <Store.Provider value={ {
            session, sessionDispatch, globalState, globalStateDispatch, addressValue, addressValueDispatch, modalState, modalStateDispatch, searchProject, searchProjectDispatch,
            pageCnt, pageCntDispatch, projectInformation, projectInformationDispatch,
            viewState, viewStateDispatch, content, contentDispatch, info, infoDispatch, page, pageDispatch,
            boardItemList , boardItemListDispatch
            } }>
                
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;