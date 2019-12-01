import React from "react";
import "./Search.scss";
import {Link, Redirect} from "react-router-dom";


class Search extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            query: "",
            redirect: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.close = this.close.bind(this);
        this.openSearch = this.openSearch.bind(this)
    }

    handleInputChange(event){
        event.persist();
        this.setState({
            ...this.state,
            query: event.target.value
        })
    }

    openSearch(event){
        event.persist();
        if(event.key === "Enter"){
            this.props.closeHandler();
            this.setState({
                ...this.state,
                redirect: true
            })
        }
    }

    close(){
        this.props.closeHandler();
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={"/black-friday/search_redirect/"+this.state.query} push />
        }
        return(
            <div className="search-overlay" style={this.props.shown ? {visibility: "visible", opacity: 1} : {visibility: "hidden", opacity: 0.0}}>
                <div className="search-overlay__close" onClick={this.close}></div>
                <div className="search-overlay__row search-overlay__row-input">
                    <input ref={this.inputRef} onChange={this.handleInputChange} onKeyPress={this.openSearch} type="text" value={this.state.query} className="search-overlay__input" />
                </div>
                <div className="search-overlay__block">
                    <div className="search-overlay__row">
                        <Link className="search-overlay__link-block" onClick={this.close} to="/black-friday/filter/smartphones">
                            <span className="search-overlay__link">
                                Смартфоны
                            </span>
                        </Link>
                    </div>
                    <div className="search-overlay__row">
                        <Link className="search-overlay__link-block" onClick={this.close} to="/black-friday/filter/laptops">
                            <span className="search-overlay__link">
                                Ноутбуки
                            </span>
                        </Link>
                    </div>
                    <div className="search-overlay__row">
                        <Link className="search-overlay__link-block" onClick={this.close} to="/black-friday/cart">
                            <span className="search-overlay__link">
                                Корзина
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;