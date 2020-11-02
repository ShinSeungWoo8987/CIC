import React, { useContext, useEffect, useState } from 'react';
import Styled from 'styled-components';
import Store from '../Store/Store';
import {get} from 'axios';
import parse from 'html-react-parser';

function DetailMainContent() {
    const { projectInformation } = useContext(Store);
    const [ project, setProject ] = useState();

    useEffect(() => {
        get(`/project/${projectInformation.number}`)
            .then(({ data }) => {
                setProject(
                    data.sort((a, b)=>{ 
                        return a.con_number < b.con_number ? -1 : a.con_number > b.con_number ? 1 : 0;  
                    })
                );
            })
            .catch(err => console.log(err));
    }, []);

    console.log(projectInformation.creator);

    return (
        <Container>
          <TitleText>{projectInformation.title}</TitleText>
          <TitleImage>
              <Image src={projectInformation.thumbnail}/><Image/>
          </TitleImage>
          
          {/* <SubText>{project.subDescription}</SubText> */}
          <SubText></SubText>

          <ContentText>
              {project?project.map(i=>i.con_content?parse(i.con_content):''):'로딩중입니다.'}
          </ContentText>
        </Container>
    );
}

export default DetailMainContent;

const Container = Styled.div`
    margin-top: 10px;
    margin-left: 49.3px;
    margin-right: 49.3px;
    width: 90.24%;
    text-align: center;
`
const TitleText = Styled.div`
    font-size: 25px;
    font-weight: bold;
`
const TitleImage = Styled.div`
    margin-top: 30px;
    width: 100%;
    height: 610;
    padding-bottom: 30px;
    border-bottom: 1px solid lightgrey;
`
const Image = Styled.img`
    width: 100%;
`
const SubText = Styled.div`
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
    font-size: 15px;
    color: gray;
    font-weight: bold;
`
const ContentText = Styled.div`
    text-align:left;
    margin-top: 30px;
    width:100%;
    padding-bottom: 50px;
    margin-bottom: 100px;
    border-bottom: 1px solid lightgrey;
    img{margin:0 auto;}
`