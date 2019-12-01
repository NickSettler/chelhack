import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import Home from "./pages/Home/Home";
import CartPage from "./pages/Cart/Cart";
import SearchPage from "./pages/Search/Search";
import SearchRedirect from "./pages/SearchRedirect/SearchRedirect";
import GoodPage from "./pages/GoodPage/GoodPage";
import Error404 from "./pages/404/404";
import Form from "./pages/Form/Form";

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            search: false,
            redirect: false,
            query: "",
        }

        this.toggleSearch = this.toggleSearch.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
    }

    toggleSearch() {
        this.setState(prevState => ({
            search: !prevState.search
        }));
    }

    closeSearch() {
        this.setState({
            ...this.state,
            search: false,
        })
    }
    openSearch() {
        this.setState({
            ...this.state,
            search: true
        })
    }

    render(){
        return (
            <div>
                <Router>
                    <Switch>
                        <Route path="/" exact component={() => (<Redirect push to="/black-friday" />)} />
                        <Route path="/black-friday/" exact component={Home} />
                        <Route path="/black-friday/filter/:type" component={Home} />
                        <Route path="/black-friday/cart" component={CartPage} />
                        <Route path="/black-friday/form" component={Form} />
                        <Route path="/black-friday/good/:id" component={props => <GoodPage {...props} />} />
                        <Route path="/black-friday/search/:query?" component={props => <SearchPage {...props} openSearch={this.openSearch} />}  />
                        <Route path="/black-friday/search_redirect/:query" component={props=><SearchRedirect {...props} />}/>
                        <Route component={Error404}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
