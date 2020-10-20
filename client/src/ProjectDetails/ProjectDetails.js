import React, {useContext, useState} from 'react';
import Styled from "styled-components";
import DetailMain from './DetailMain';
import DetailSub from './DetailSub';

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
    margin-left:12.5%;
    width: 1665px;
    text-align: center;
`
const Text = Styled.div`
font-size: 17.5px;
`
const A = Styled.a`
  cursor: pointer;
`
const LeftSide = Styled(Left)`
  width: 75%;
`
const RightSide = Styled(Left)`
  width: 24.5%;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////