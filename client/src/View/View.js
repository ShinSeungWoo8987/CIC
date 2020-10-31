import React, { useContext } from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';
import Main from '../DefaultMenuPage/Main';
import ReadBoard from '../DefaultMenuPage/ReadBoard';
import ProjectDetails from '../ProjectDetails/ProjectDetails';
import AddProject from '../AddProject/AddProject';
import AddBoard from '../Board/AddBoard';
import ProjectList from '../InformationPage/ProjectList';
import RequestCreator from '../DefaultMenuPage/RequestCreator';
import MemberList from '../DefaultMenuPage/MemberList';

function MainView() {
    const { globalState } = useContext(Store);
    const mainPage = ['all', 'tech', 'travel', 'fashion']; // Main Page Menu List
    const informationPage = ['fundingList', 'projectList','projectListAll'];
    var idx = 0;
    while (idx<mainPage.length){
        if(mainPage[idx] === globalState.main){
            return <Container><Main/></Container>;
        }
        idx += 1;
    }
    idx = 0;
    while (idx<informationPage.length){
        if(informationPage[idx] === globalState.main){
            return <Container><ProjectList/></Container>;
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
    if(globalState.main==='requestCreator'){
        return <RequestCreator/>;
    }
    if(globalState.main==='acceptCreator' || globalState.main==='memberList'){
        return <MemberList/>;
    }
}
export default MainView;

const Container = Styled.div`
`