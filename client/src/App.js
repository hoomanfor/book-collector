import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./components/pages/Search.js";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Search} />
    </Switch>
  </Router>
)

export default App;
