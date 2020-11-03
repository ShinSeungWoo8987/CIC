import React, { useContext, useEffect } from 'react';

import Store from '../Store/Store';
import SetInformation from './SetInformation';
import SetContent from './SetContent';
import styled from 'styled-components';
import {executeHelloService} from '../Jwt/AuthenticationService';

function AddProject(props) {
  const { info, infoDispatch, project, content, contentDispatch, page, projectInformation } = useContext(Store);
  const writeInfo = <SetInformation />
  const writeContent = <SetContent/>
  
  useEffect(()=>{
    contentDispatch({ type: project?'CHANGE':'DEFAULT', payload: project?project.map(i=>{
      return {
        id:i.con_number-project[0].con_number,
        head:i.con_type==='t '?'text':'image',
        content:i.con_content
      }
      }):'' });
  },[]);

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