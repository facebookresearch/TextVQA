// Copyright (c) Facebook, Inc. and its affiliates.
import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import Explore from './components/Explore';
import Home from './components/Home';

import './App.css';
import theme  from './styles';
import Challenge2019 from './components/Challenge2019';
import Challenge from './components/Challenge';
import {default as Challenge2020} from './components/Challenge2020';
import TextCapsChallenge from './components/TextCapsChallenge';
import {default as TextCapsChallenge2020} from './components/TextCapsChallenge2020';
import Download from './components/Download';
import Code from './components/Code';
import Paper from './components/Paper';
import TextCapsDownload from './components/TextCapsDownload';
import TextVQAHead from './components/TextVQAHead';
import TextCapsHead from './components/TextCapsHead';
import TextOCRHead from './components/TextOCRHead';
import TextOCRDownload from './components/TextOCRDownload';

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
                <Route path="/" component={TextVQAHead} />
                <Route path="/textcaps" component={TextCapsHead} />
                <Route path="/textcaps" exact component={Home} />
                <Route path="/textocr" component={TextOCRHead} />
                <Route path="/textocr" exact component={Home} />
                <Route path="/:type?/explore" component={Explore} />
                <Route exact path="/textcaps/challenge" component={TextCapsChallenge} />
                <Route exact path="/textcaps/challenge/2021" component={TextCapsChallenge} />
                <Route exact path="/textcaps/challenge/2020" component={TextCapsChallenge2020} />
                <Route exact path="/challenge/2019" component={Challenge2019} />
                <Route exact path="/challenge/2020" component={Challenge2020} />
                <Route exact path="/challenge" component={Challenge} />
                <Route exact path="/challenge/2021" component={Challenge} />
                <Route exact path="/download" component={Download} />
                <Route exact path="/textcaps/download" component={TextCapsDownload} />
                <Route exact path="/textocr/download" component={TextOCRDownload} />
                <Route path="/:type?/code" component={Code} />
                <Route exact path="/dataset" component={Download} />
                <Route exact path="/textcaps/dataset" component={TextCapsDownload} />
                <Route exact path="/textocr/dataset" component={TextOCRDownload} />
                <Route path="/:type?/paper" component={Paper} />
              </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
