import React from "react";
import {Redirect} from "react-router-dom";

class SearchRedirect extends React.Component{
    render(){
        return (
            <Redirect to={"/black-friday/search/"+this.props.match.params.query} push />
        )
    }
}

export default SearchRedirect;