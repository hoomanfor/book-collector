import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/pages/Search.js";
import Saved from "./components/pages/Saved.js";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/saved" component={Saved} />
      <Route path="*" component={Search} />
    </Switch>
  </Router>
)

export default App;
