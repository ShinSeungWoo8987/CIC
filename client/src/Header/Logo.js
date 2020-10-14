import React from 'react';
import Styled from 'styled-components'; // Styled-components 라이브러리를 사용하기 위해 선언
import LogoImg from '../Image/Logo.png';

function Logo() {
    return (
      <Container>
        <ImageContainer>
          <Image src={LogoImg} />
        </ImageContainer>
        <TextContainer>
          <Text>CIC</Text>
        </TextContainer>
      </Container>
    );
  }
  export default Logo;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Left = Styled.div`
  float: left;
`
const Container = Styled.a`
  width: 12.5%;
  float: left;
`
const ImageContainer = Styled(Left)`
  width: 50px;
  padding: 16px 0 0 0;
  margin: 0 50px 0 0;
`
const Image = Styled.img`
`
const TextContainer = Styled(Left)`
  height: 50px;
`
const Text = Styled.div`
  font-size: 40px;
`
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////