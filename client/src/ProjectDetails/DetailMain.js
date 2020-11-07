import React, { useContext } from 'react';
import Styled from 'styled-components';
import DetailMainContent from './DetailMainContent';
import Store from '../Store/Store';
import RecentlyNewsDetail from '../RecentlyNews/NewsDetail'
import RecentlyNewsList from '../RecentlyNews/NewsList'
import AddRecentlyNews from '../RecentlyNews/AddNews'
import ProjectSupport from './ProjectSupport';
import Funding from './Funding';
import FundingMemberList from './FundingMemberList';
import AddProject from '../AddProject/AddProject';

function DetailMain(props) {
    const { globalState } = useContext(Store);
    let content = '';
    if(globalState.sub==='introduction') content = <DetailMainContent/>
    else if(globalState.sub==='recentlyNews' && globalState.action==='read') content = <RecentlyNewsDetail/>
    else if(globalState.sub==='recentlyNews' && globalState.action==='add') content = <AddRecentlyNews/>
    else if(globalState.sub==='recentlyNews' && globalState.action==='update') content = <AddRecentlyNews/>
    else if(globalState.sub==='recentlyNews') content = <RecentlyNewsList/>
    else if(globalState.sub==='supportMessage') content = <ProjectSupport/>
    else if(globalState.sub==='editProject') content = <AddProject/>

    return (
        <Container>
            {content}
            <Funding/>
            <FundingMemberList/>
        </Container>
    );
}
export default DetailMain;

const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    position: relative;
    left: 144px;
    width: 1010.7px;
    // height: 3000px;
    text-align: center;
`