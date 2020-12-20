import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Redux
import { Provider } from "react-redux";
import store from "./store";

// Layout
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import NavigationBar from "./componets/layout/NavigationBar";
import Alarm from "./componets/layout/Alarm";

// Pages
import Auth from "./componets/auth/Auth";
import Search from "./componets/search/Search";
import HousePage from "./componets/house/HousePage";
import AddReview from "./componets/review/AddReview";
import Landing from "./componets/landing/Landing";

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
          <section className='container'>
            <Switch>
              <Route exact path='/auth' component={Auth} />
              <Route exact path='/search' component={Search} />
              <Route exact path='/property/:address' component={HousePage} />
              <Route exact path='/addreview' component={AddReview} />
              <Route exact path='/addreview/:address' component={AddReview} />
              <Route exact path='/' component={Landing} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
