import React, { useContext } from 'react';

import Store from './store/store';
import SetInformation from './SetInformation';
import SetContent from './SetContent';

function App(props) {
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
    <>
      {view}
    </>
  );
}

export default App;