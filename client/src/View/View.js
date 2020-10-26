import React, { useContext } from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';
import Main from '../DefaultMenuPage/Main';
import Event from '../DefaultMenuPage/Event';
import Notice from '../DefaultMenuPage/Notice';
import QnA from '../DefaultMenuPage/QnA';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import AddProject from '../AddProject/AddProject';
import AddBoard from '../Board/AddBoard';

function MainView() {
    const { globalState } = useContext(Store);
    // 임시로 펀딩목록 및 메인페이지 같이 표현 - 실제로 동일한 코드
    const mainPage = ['all', 'tech', 'travel', 'fashion', 'fundingList']; // Main Page Menu List
    var idx = 0;
    while (idx<mainPage.length){
        if(mainPage[idx] === globalState.main){
            return <Container><Main/></Container>;
        }
        idx += 1;
    }
    if(globalState.main==='projectDetails'){
        return <ProjectDetails/>;
    }
    if(globalState.main==='addProject'){
        return <AddProject/>;
    }
    if(globalState.main==='addEvent' || globalState.main==='addNotice' || globalState.main==='addCenter'){
        return <AddBoard/>;
    }
    if(globalState.main==='event'){
        return <Event/>;
    }
    if(globalState.main==='notice'){
        return <Notice/>;
    }
    if(globalState.main==='center'){
        return <QnA/>;
    }
    return <Event/>;
}
export default MainView;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
    margin-left: 12.5%;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////