import './App.css';

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Navbar from './Components/Navbar/Navbar'
import Content from './Components/Content/Content';
import Homepage from './Components/Homepage/Homepage';
import Player from './Components/Player/Player';
import DbContent from './Dbcomponents/DbContent.js/DbContent';
import Addsong from './Dbcomponents/Addsongs/Addsong';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" component={Homepage} exact />
          <Route path="/apimusic" component={Content} exact />
          <Route path="/DbContent" component={DbContent} exact />
          <Route path="/addsong" component={Addsong} exact />
          <Route path="/Player/:id" component={Player} exact />
        </Switch>
      </Router>
    </>
  );
}

export default App;
