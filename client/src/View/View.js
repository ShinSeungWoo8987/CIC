import React, { useContext } from 'react';
import Store from '../Store/Store';
import Main from '../Main/Main';
import Event from '../Main/Event';
import Styled from 'styled-components';

function MainView() {
    const { globalState } = useContext(Store);
    // Main Page Menu List
    const mainPage = ['all', 'tech', 'travel', 'fashion'];
    // Page View Setting
    let mainView = '';
    var i = 0;
    while (i<mainPage.length){
        if(mainPage[i] === globalState.main){
            return <Container><Main/></Container>;
            // mainView = <Main/>
        }
        i += 1;
    }
    if(globalState.main==='event'){
        return <Event/>;
    }
    return (
        mainView    
    );
}
export default MainView;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    margin-left: 12.5%;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////