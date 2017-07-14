import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import store from './reducers/store';
import TeamSelector from './TeamSelector';
import allTeams from './data';
import Alert from './Alert';
import './pre';
import './style.scss';

const node = document.getElementById('app');
const appStore = createStore(store);

const app = (
  <Provider store={appStore}>
    <MuiThemeProvider>
      <div>
        <AppBar
          title="NBA Trade Machine"
          showMenuIconButton={false}
        />
        <div className="container">
          <div className="row">
            <TeamSelector
              allTeams={allTeams}
              isTeamOne
            />
            <TeamSelector
              allTeams={allTeams}
            />
          </div>
          <div className="row">
            <Alert />
          </div>
        </div>
      </div>
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(app, node);
