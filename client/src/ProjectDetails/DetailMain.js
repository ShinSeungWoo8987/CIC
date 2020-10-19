import React, { useContext } from 'react';
import Styled from 'styled-components';
import DetailMainHeader from './DetailMainHeader';
import DetailMainContent from './DetailMainContent';
import Store from '../Store/Store';
import ProjectNews from './ProjectNews';
import ProjectSupport from './ProjectSupport';

function DetailMain(props) {
    const {detailMainHeader, detailMainHeaderDispatch} = useContext(Store);
    let content = <DetailMainContent/>
    if(detailMainHeader===2) content = <ProjectNews/>
    else if(detailMainHeader===3) content = <ProjectSupport/>

    return (
        <Container>
            <Upside> <DetailMainHeader/> </Upside>
            <Downside> {content} </Downside>
        </Container>
    );
}
export default DetailMain;

const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 100%;
    text-align: center;
`
const Upside = Styled(Left)`
  width: 100%;
  height: 70px;
`
const Downside = Styled(Left)`
  width: 100%;
`