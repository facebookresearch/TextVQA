import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Header from './components/Header';
import ExploreNew from './components/Explore_new';
import Home from './components/Home';

import logo from './logo.svg';
import './App.css';
import theme from './styles';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div className="App">
            <header className="App-header">
              <Header/>
            </header>
              <div>
                <Route path="/" exact component={Home} />
                <Route path="/explore" component={ExploreNew} />
              </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
