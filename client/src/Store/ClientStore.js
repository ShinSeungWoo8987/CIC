import React, { useReducer } from 'react';
import Store from './Store';
import { _session, sessionReducer, _globalState, globalStateReducer, _addressValue, addressValueReducer, _modalState, modalStateReducer, _search, searchReducer,
         _pageNumber, pageNumberReducer, _projectInformation, projectInformationReducer, boardItemListReducer,
         _viewPage, viewStateReducer, pageReducer, _content, contentReducer, _info, infoReducer,
         projectReducer } from './clientReducer';

function ClientStore(props) {

    // const [ .. , ..Dispatch] = useReducer( Reducer, '');
    const [session, sessionDispatch] = useReducer(sessionReducer, _session);
    const [globalState, globalStateDispatch] = useReducer(globalStateReducer, _globalState);
    const [addressValue, addressValueDispatch] = useReducer(addressValueReducer, _addressValue);
    const [modalState, modalStateDispatch] = useReducer(modalStateReducer, _modalState);
    const [search, searchDispatch] = useReducer(searchReducer, _search);
    const [pageNumber, pageNumberDispatch] = useReducer(pageNumberReducer, _pageNumber);
    const [projectInformation, projectInformationDispatch] = useReducer(projectInformationReducer, _projectInformation)

    const [viewState, viewStateDispatch] = useReducer(viewStateReducer, _viewPage);
    const [content, contentDispatch] = useReducer(contentReducer, _content);
    const [info, infoDispatch] = useReducer(infoReducer, _info);
    const [page, pageDispatch] = useReducer(pageReducer, 'writeInfo');
    const [ boardItemList , boardItemListDispatch] = useReducer( boardItemListReducer, '');
    const [ project, projectDispatch] = useReducer( projectReducer);

    return (
        <Store.Provider value={ {
            session, sessionDispatch, globalState, globalStateDispatch, addressValue, addressValueDispatch, modalState, modalStateDispatch, search, searchDispatch,
            pageNumber, pageNumberDispatch, projectInformation, projectInformationDispatch,
            viewState, viewStateDispatch, content, contentDispatch, info, infoDispatch, page, pageDispatch,
            boardItemList , boardItemListDispatch, project, projectDispatch
            } }>
                
            {props.children}
        </Store.Provider>
    );
}

export default ClientStore;