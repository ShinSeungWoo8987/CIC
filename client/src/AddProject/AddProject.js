import React, { useContext, useEffect } from 'react';
import {get} from 'axios';
import Store from '../Store/Store';
import SetInformation from './SetInformation';
import SetContent from './SetContent';
import styled from 'styled-components';
import {executeHelloService} from '../Jwt/AuthenticationService';

function AddProject(props) {
  const { globalState, info, infoDispatch, project, content, contentDispatch, page, projectInformation } = useContext(Store);
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
          thumbnail: data.pro_thumbnail, // 이거 처리필요
          logo: data.pro_logo, // 이거 처리필요
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

  const writeInfo = <SetInformation />
  const writeContent = <SetContent/>

  let view = '';
  switch (page) {
    default:
      view = '';
      break;
    case 'writeContent':
      view = writeContent;
      break;
    case 'writeInfo':
      view = writeInfo;
      break;
  }

  return (
    <Container>
      {view}
      <button onClick={()=>executeHelloService()}>+++</button>
    </Container>
  );
}

export default AddProject;
const Container = styled.div`
margin-left: 12.5%
`