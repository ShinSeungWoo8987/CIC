import React, { useContext } from 'react';
import Styled from 'styled-components';
import DetailMainContent from './DetailMainContent';
import Store from '../Store/Store';
import ProjectNewsList from './ProjectNewsList';
import ProjectSupport from './ProjectSupport';
import Funding from './Funding';
import FundingMemberList from './FundingMemberList';

function DetailMain(props) {
    const { globalState } = useContext(Store);
    let content = '';
    if(globalState.sub==='introduction') content = <DetailMainContent/>
    else if(globalState.sub==='recentlyNews') content = <ProjectNewsList/>
    else if(globalState.sub==='supportMessage') content = <ProjectSupport/>

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
    height: 3000px;
    text-align: center;
`