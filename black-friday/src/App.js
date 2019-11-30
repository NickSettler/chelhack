import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./pages/Home/Home";

class App extends React.Component {
    render(){
        return (
            <Router>
                <Switch>
                    <Route path="/black-friday/" exact>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );
    }
}

export default App;
