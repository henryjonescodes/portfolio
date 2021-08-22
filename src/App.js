import React from 'react'
import './App.css';
import Home  from './pages';
import SignInPage from './pages/signin';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Photography from './pages/photography';
import Contact from './pages/contact';
import Projects from './pages/projects';
import About from './pages/about';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/signin" component={SignInPage} exact/>
        <Route path="/contact" component={Contact} exact/>
        <Route path="/gallery" component={Photography} exact/>
        <Route path="/projects" component={Projects} exact/>
        <Route path="/about" component={About} exact/>
      </Switch>
    </Router>
  );
}

export default App;
