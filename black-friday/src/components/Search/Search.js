import React from "react";
import "./Search.scss";

class Search extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="search-overlay" style={this.props.shown ? {visibility: "visible"} : {visibility: "hidden"}}>
                <div className="search-overlay__close"></div>
                <div className="search-overlay__row search-overlay__row-input">
                    <input type="text" className="search-overlay__input" />
                </div>
                <div className="search-overlay__block">
                    <div className="search-overlay__row">
                        <span className="search-overlay__link">
                            Something
                        </span>
                    </div>
                    <div className="search-overlay__row">
                        <span className="search-overlay__link">
                            Something
                        </span>
                    </div>
                    <div className="search-overlay__row">
                        <span className="search-overlay__link">
                            Something
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Search;