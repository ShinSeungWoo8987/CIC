import React, { useState } from 'react';
import Styled from 'styled-components';

function DetailMainContent(props) {
    const [project, setProject] = useState({
        title:'[더 무겁고 더 따뜻한 워크웨어] 튜뮤의 14포켓 헤링본 해비워크수트',
        img:'https://crowdincreative.s3.ap-northeast-2.amazonaws.com/test_project/title_img.jpg',
        subDescription:`[워크웨어] 임무에 따라 장시간 적은 움직임으로 추위를 견뎌야하는 모든 직업을 위한 워크웨어 브랜드 튜뮤의 '14포켓 헤링본 해비워크수트'를 소개합니다.`,
        content:'컨텐츠'
    });
    return (
        <Container>
          <TitleText>{project.title}</TitleText>
          <TitleImage>
              <Image src={project.img}/>
          </TitleImage>
          <SubText fontSize="20">{project.subDescription}</SubText>
          <ContentText>{project.content}</ContentText>
        </Container>
    );
}

export default DetailMainContent;

const Container = Styled.div`
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
    width: 75%;
    text-align: center;
`
const TitleText = Styled.div`
    font-size: 35px;
    font-weight: bold;
`
const TitleImage = Styled.div`
    margin-top: 30px;
    width: 935px;
    height: 610;
`
const Image = Styled.img`
    width:935px;
`
const SubText = Styled.div`
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    font-size: 20px;
    color: gray;
    font-weight: bold;
`
const ContentText = Styled.div`
    margin-top: 30px;
    width:100%;
`