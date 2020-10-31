import React, { useContext } from 'react';
import Styled from 'styled-components';
import DetailMainContent from './DetailMainContent';
import Store from '../Store/Store';
import ProjectNewsList from './ProjectNewsList';
import ProjectSupport from './ProjectSupport';
import Funding from './Funding';

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
        </Container>
    );
}
export default DetailMain;

const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1248px;
    height: 3000px;
    text-align: center;
`