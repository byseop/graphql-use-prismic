import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Test from '../components/Test';

const MainRoute = () => {
  return (
    <Switch>
      <Route path="/" exact component={Test} />
      <Redirect to="/" />
    </Switch>
  );
};

export default MainRoute;
