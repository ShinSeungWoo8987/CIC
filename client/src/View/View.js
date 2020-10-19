import React, { useContext } from 'react';
import Store from '../Store/Store';
import Main from '../Main/Main';
import Event from '../Main/Event';
import Styled from 'styled-components';

function MainView() {
    const { globalState } = useContext(Store);
    const mainPage = ['all', 'tech', 'travel', 'fashion', 'fundingList']; // Main Page Menu List
    var idx = 0;
    while (idx<mainPage.length){
        if(mainPage[idx] === globalState.main){
            return <Container><Main/></Container>;
        }
        idx += 1;
    }
    if(globalState.main==='event'){
        return <Event/>;
    }
    if(globalState.main==='notice'){
        return <Event/>;
    }
    if(globalState.main==='center'){
        return <Event/>;
    }
    return <Event/>;
}
export default MainView;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    margin-left: 12.5%;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////