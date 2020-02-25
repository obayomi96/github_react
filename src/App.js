 
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ReadmePage from './components/ReadmePage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route path='/readme/:owner/:repo' component={ReadmePage} />
    </Switch>
  </BrowserRouter>
);

export default App;