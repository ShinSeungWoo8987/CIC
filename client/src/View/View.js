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
import Test from '../Components/Test';

function MainView() {
    const { globalState, info } = useContext(Store);

    if(globalState.main==='test'){
        return <Test/>;
    }
    if(globalState.main==='all' || globalState.main==='tech' || globalState.main==='travel' || globalState.main==='fashion'){
        return <Main/>
    }
    if(globalState.main==='fundingList' || globalState.main==='projectList' || globalState.main==='projectListAll'){
        return <ProjectList/>;
    }
    if(globalState.main==='projectDetails'){
        if(globalState.sub==='editProject'){
            return <AddProject/>;
        }else{
            return <ProjectDetails/>;
        }
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
    if(globalState.main==='gradeUp'){
        return <RequestCreator/>;
    }
    if(globalState.main==='adminGradeUp' || globalState.main==='userList'){
        return <MemberList/>;
    }
    
    return<></>;
}
export default MainView;