import React, { useContext, useEffect, useState } from 'react';
import {get} from 'axios';
import Store from '../Store/Store';
import SetInformation from './SetInformation';
import SetContent from './SetContent';
import styled from 'styled-components';

function AddProject(props) {
  const {
    globalState, info, infoDispatch, project, content, contentDispatch, page, projectInformation,
    modalStateDispatch, pageDispatch, messageDispatch
  } = useContext(Store);
  const [newInfo, setNewInfo] = useState(info);
  
  useEffect(()=>{
    if(globalState.main==="projectDetails" && globalState.sub==="editProject"){
      get(`/project/information/${projectInformation.number}`)
      .then(({data})=>{
        const payload = {
          project_name: data.pro_title,
          category: `${data.typ_number}`,
          target_money: data.pro_target,
          sdate: data.pro_start.substr(0,10),
          fdate: data.pro_finish.substr(0,10),
          thumbnail: data.pro_thumbnail,
          logo: data.pro_logo,
          funding_price: data.pro_price,
          email: data.pro_email
        };
        infoDispatch({type:'CHANGE_INFO',payload});
      })
      .catch(err=>alert(err));
    }

    contentDispatch({ type: project?'CHANGE':'DEFAULT', payload: project?project.map(i=>{
      return {
        id:i.con_number-project[0].con_number,
        head:i.con_type==='t '?'text':'image',
        content:i.con_content
      }
      }):'' });
  },[]);

  const toWriteContent = (e) => {
    e.preventDefault();
    if( newInfo.project_name==='' || newInfo.target_money==='' || newInfo.sdate==='' || newInfo.fdate==='' || newInfo.funding_price==='' || newInfo.email==='' ){
      messageDispatch({type:"MESSAGE", payload: {value: `양식을 모두 작성해주세요.`} });
      modalStateDispatch({type:"CHANGE_MODALSTATE", payload: {message:true} });
      return false;
    } else if( newInfo.category==='' || newInfo.thumbnail==='' || newInfo.logo==='' ){
        messageDispatch({type:"MESSAGE", payload: {
            value: [
                `양식을 모두 작성해주세요.`,
                <br key='br'/>,
                `[ ${newInfo.category===''?'카테고리 ':''}${newInfo.thumbnail===''?'썸네일 ':''}${newInfo.logo===''?'로고 ':''}]`
            ]
        } });
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload: {message:true} });
        return false;
    }

    e.preventDefault();
    if(newInfo.sdate>newInfo.fdate) {
        let payload={value:'잘못된 프로젝트 기간입니다.'}
        messageDispatch({type:"MESSAGE", payload});
        payload={message:true}
        modalStateDispatch({type:"CHANGE_MODALSTATE", payload});
        document.getElementById('fdate').focus();
        return false;
    }
    infoDispatch({ type: 'CHANGE_INFO', payload: newInfo })
    pageDispatch({ type: 'CHANGE_PAGE', payload: 'writeContent' });
  }

  const writeInfo = <SetInformation newInfo={newInfo} setNewInfo={setNewInfo} toWriteContent={toWriteContent} />
  const writeContent = <SetContent/>

  let navItem = []

  let view = '';
  switch (page) {
    default:
      view = '';
      break;
    case 'writeInfo':
      view = writeInfo;
      navItem = [
        <LineSection key='1' id='writeContent'>&nbsp;프로젝트정보&nbsp;</LineSection>,
        <Section key='2' id='writeInfo' onClick={e =>{toWriteContent(e)}}>&nbsp;프로젝트내용&nbsp;</Section>
      ]
      break;
    case 'writeContent':
      view = writeContent;
      navItem = [
        <Section key='1' id='writeContent' onClick={() =>toWriteInfo()}>&nbsp;프로젝트정보&nbsp;</Section>,
        <LineSection key='2' id='writeInfo'>&nbsp;프로젝트내용&nbsp;</LineSection>
      ]
      break;
  }

  const toWriteInfo = () => pageDispatch({ type: 'CHANGE_PAGE', payload: 'writeInfo' });

  return (
    <Container>
      <Center>
          <Nav>
              <Head>프로젝트 등록</Head>
              <NavItem>
                  {navItem}
              </NavItem>
          </Nav>
          {view}
      </Center>
    </Container>
  );
}

export default AddProject;


const Container = styled.div`
  float:left;
  width: 100%;
  minheight: 880px;
  margin: -34px 0 0 110px;
`
const Center = styled.div`
    margin: 0 auto;
    width: 60%;
`
const Nav = styled.div`
float: left;
width: 100%;
height: 112px;
text-align: center;
`
const Head = styled.div`
padding-top: 10px;
font-size: 38px;
font-weight: bold;
`
const NavItem = styled.div`
padding: 0 29%;
margin-top: 16px;
width: 42%;
height: 32px;
font-size: 18px;
border-bottom: 1px solid lightgrey;
`
const Section = styled.div`
    z-index: 3;
    height: 30px;
    float: left;
    margin: 0 30px;
    cursor: pointer;
`
const LineSection = styled(Section)`
    border-bottom: 3px solid #83E538;
`