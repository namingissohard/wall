import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import 'sweetalert';
import 'bootstrap/dist/css/bootstrap.css';
import registerServiceWorker from './registerServiceWorker';
import * as RoutesModule from './route'
function renderApp() {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter children={routes}/>
    </AppContainer>,
    document.getElementById('root') as HTMLElement
  );
}
let routes = RoutesModule.routes
renderApp();
if (module.hot) {
  module.hot.accept('./route', () => {
      routes = require<typeof RoutesModule>('./route').routes;
      renderApp();
  });
}
registerServiceWorker();
