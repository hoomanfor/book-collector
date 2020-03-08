import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Search from "./pages/Search";
import Saved from "./pages/Saved";

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <Route exact path="/" component={Search} />
      <Route exact path="/saved" component={Saved} />
      <Route path="*" component={Search} />
    </Switch>
  </Router>
)

export default App;
