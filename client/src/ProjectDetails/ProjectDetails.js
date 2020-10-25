import React from 'react';
import Styled from "styled-components";
import DetailMain from './DetailMain';
import _DetailSub from './DetailSub';

function ProjectDetails() {
    return(
        <Container>
            <LeftSide>
                <DetailMain/>
            </LeftSide>
            <RightSide>
                <DetailSub/>
            </RightSide>
        </Container>
    );
}
export default ProjectDetails;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1665px;
    margin: 0 0 0 0;
`
const LeftSide = Styled(Left)`
    width: 74%;
`
const RightSide = Styled(Left)`
    width: 24.5%;
`
const DetailSub = Styled(_DetailSub)`
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////