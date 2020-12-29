import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";
import Container from "react-bootstrap/Container";

// Layout
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import NavigationBar from "./componets/layout/NavigationBar";
import Alarm from "./componets/layout/Alarm";

// Pages
import Auth from "./componets/auth/Auth";
import Search from "./componets/search/Search";
import HousePage from "./componets/house/HousePage";
import Landing from "./componets/landing/Landing";
import AddProperty from "./componets/house/AddProperty";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavigationBar />
          <Alarm />
          <Route exact path='/' />
          <section>
            <Container fluid='sm' className='mx-auto px-0'>
              <Switch>
                <Route exact path='/' component={Landing} />
                <Route exact path='/auth' component={Auth} />
                <Route exact path='/search' component={Search} />
                <Route
                  exact
                  path='/property/:zip/:city/:street'
                  component={HousePage}
                />
                <Route exact path='/property/add' component={AddProperty} />
              </Switch>
            </Container>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
