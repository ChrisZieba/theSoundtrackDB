import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Popular from './Popular';
import Soundtrack from './Soundtrack';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Popular}/>
      <Route path='/soundtrack/:id' component={Soundtrack}/>
    </Switch>
  </main>
);

export default Main;