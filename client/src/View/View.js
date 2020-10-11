import React, { useContext } from 'react';
import Store from '../Store/Store';
import Main from '../Main/Main';

function MainView() {
    const { globalState } = useContext(Store);
    // Main Page Menu List
    const mainPage = ['all', 'tech', 'travel', 'fashion'];
    // Page View Setting
    let mainView = '';
    var i = 0;
    while (i<mainPage.length){
        if(mainPage[i] === globalState.main){
            mainView = <Main/>
        }
        i += 1;
    }
    return(
        <span>
            {mainView}
        </span>
    );
}
export default MainView;