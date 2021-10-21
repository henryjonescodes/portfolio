import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css'; 

import Home  from './pages/home';
import SignInPage from './pages/signin';
import Photography from './pages/photography';
import Contact from './pages/contact';
import Projects from './pages/projects';
import About from './pages/about';

import ScrollToTopWrapper from './components/Common/ScrollToTopWrapper'

function App() {
  return (
    <Router>
      <ScrollToTopWrapper>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/signin" component={SignInPage} exact/>
          <Route path="/contact" component={Contact} exact/>
          <Route path="/gallery" component={Photography} exact/>
          <Route path="/projects" component={Projects} exact/>
          <Route path="/about" component={About} exact/>
        </Switch>
      </ScrollToTopWrapper>

    </Router>
  );
}

export default App;
