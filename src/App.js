import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css'; 

import Home  from './pages/home';
import Photography from './pages/photography';
import Contact from './pages/contact';
import Projects from './pages/projects';
import About from './pages/about';

import ScrollToTopWrapper from './components/Common/ScrollToTopWrapper'
import virtualportfolio from './pages/virtualportfolio';
import DetailPage from './components/Common/DetailPage';
import ArtGallery from './pages/artgallery';

function Store({ match }) {
  let { id } = match.params;
  const imageHasLoaded = true;

  return (
    <>
        {id && imageHasLoaded && <DetailPage id={id} lightcolor={true} key="page" />}
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTopWrapper>
        <Switch>
          <Route path="/" component={Home} exact/>
          <Route path="/contact" component={Contact} exact/>
          <Route path={["/photography","/photography/*"]} component={Photography} exact/>
          <Route path={["/artgallery","/artgallery/*"]} component={ArtGallery} exact/>
          <Route path="/projects" component={Projects} exact/>
          <Route path={["/about","/about/*"]} component={About} exact/>
          <Route path="/virtualportfolio" component={virtualportfolio} exact/>
          <Route path="/detailtest" component={DetailPage} exact/>
          <Route path={["/details/:id", "/details/"]} component={Store} />
        </Switch>
      </ScrollToTopWrapper>
    </Router>
  );
}

export default App;
