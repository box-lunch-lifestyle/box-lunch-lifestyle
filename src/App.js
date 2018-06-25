import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import UserPage from './components/UserPage/UserPage';
import AdminPage from './components/AdminPage/AdminPage';
import CompletedPage from './components/CompletedPage/CompletedPage';
import HomePage from './components/HomePage/HomePage';
import JournalPage from './components/JournalPage/JournalPage';
import MilestonePage from './components/MilestonePage/MilestonePage';
import Timer from './components/Timer/Timer';
import TimerSelect from './components/TimerSelect/TimerSelect';

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Project Base" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/login"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
        />
        <Route
          path="/admin"
          component={AdminPage}
        />
        <Route
          path="/completed"
          component={CompletedPage}
        />
        <Route
          path="/home"
          component={HomePage}
        />
        <Route
          path="/journal"
          component={JournalPage}
        />
        <Route
          path="/milestone"
          component={MilestonePage}
        />
        <Route
          path="/timer"
          component={Timer}
        />
        <Route
          path="/timerSelect"
          component={TimerSelect}
        />

        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
