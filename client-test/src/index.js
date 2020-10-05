import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import ClientStore from './store/ClientStore';

ReactDOM.render(
  <ClientStore>
    <App />
  </ClientStore>
  ,document.getElementById('root')
);

serviceWorker.unregister();
