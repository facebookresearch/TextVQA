import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import Explore from './components/Explore';
import Home from './components/Home';

import './App.css';
import theme from './styles';
import Challenge from './components/Challenge';
import Download from './components/Download';
import Paper from './components/Paper';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL + '/'}>
          <div className="App">
            <header className="App-header">
              <Header/>
            </header>
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/explore" component={Explore} />
                <Route path="/challenge" component={Challenge} />
                <Route path="/download" component={Download} />
                <Route path="/paper" component={Paper} />
              </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
