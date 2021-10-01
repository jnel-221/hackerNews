import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Search from "./pages/Search";
import History from "./pages/History";

function App() {
  return (
    <div className="App">
      <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path ={["/"]}>
          <Search/>
        </Route>
        <Route exact path ={["/history"]}>
          <History/>
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
