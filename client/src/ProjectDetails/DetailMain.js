import React, { useContext } from 'react';
import Styled from 'styled-components';
import DetailMainHeader from './DetailMainHeader';
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
            <Upside> <DetailMainHeader/> </Upside>
            <Downside> {content} </Downside>
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
    text-align: center;
`
const Upside = Styled(Left)`
    width: 100%;
`
const Downside = Styled(Left)`
    width: 100%;
    height: 3000px;
    margin: 45px 0 0 0;
`