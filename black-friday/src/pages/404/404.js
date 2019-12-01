import React from "react";
import "./404.scss";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import {Link} from "react-router-dom";

class Error404 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            good: {},
            search: false,
            redirect: false,
        }

        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
    }


    closeSearch() {
        console.log("[SEARCH] - CLOSE")
        this.setState({
            ...this.state,
            search: false,
        })
    }
    openSearch() {
        console.log("[SEARCH] - OPEN")
        this.setState({
            ...this.state,
            search: true
        })
    }

    render(){
        return(
            <div className="error404">
                <Header openSearch={this.openSearch} />
                <div className="error404__content">
                    <div className="error404__img"/>
                    <span className="error404__title">
                        Как вас сюда занесло?
                    </span>
                    <Link to='/' className="error404__link">Главная</Link>
                </div>
                <Search shown={this.state.search} closeHandler={this.closeSearch}/>
            </div>
        );
    }
}
export default Error404;