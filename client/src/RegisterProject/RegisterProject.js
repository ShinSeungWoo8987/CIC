import React, { useContext } from 'react';

import Store from '../Store/Store';
import SetInformation from './SetInformation';
import SetContent from './SetContent';
import styled from 'styled-components';
import {executeHelloService} from '../Jwt/AuthenticationService';

function RegisterProject(props) {
  const { page } = useContext(Store);
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

export default RegisterProject;
const Container = styled.div`
margin-left: 12.5%
`