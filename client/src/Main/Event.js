import React from 'react';
import Styled from "styled-components" // styled-components 라이브러리를 사용하기 위해 선언

function Event() {
    return(
        <Container>
            
        </Container>
    );
}
export default Event;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
    float: left;
`
const Container = Styled(Left)`
    width: 1405px;
    height: 2000px;
    margin: 60px 0 0 15%;
    // width: 1665px;
    // margin: 60px 0 0 12.5%;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////