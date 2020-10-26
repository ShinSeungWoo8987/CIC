import React, { useContext } from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';
import Main from '../DefaultMenuPage/Main';
import ReadBoard from '../DefaultMenuPage/ReadBoard';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import AddProject from '../AddProject/AddProject';
import AddBoard from '../Board/AddBoard';

function MainView() {
    const { globalState, modalState } = useContext(Store);
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
    if(globalState.main==='event' || globalState.main==='notice' || globalState.main==='center'){
        return <ReadBoard/>;
    }
    return <ReadBoard/>;
}
export default MainView;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Container = Styled.div`
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////