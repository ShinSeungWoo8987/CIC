import React, { useContext } from 'react';

import Main from '../Main/Main';
import Store from '../Store/Store';

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
    return mainView
}
export default MainView;