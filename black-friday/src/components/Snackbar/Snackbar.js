import React from "react";
import "./Snackbar.scss";
import {Link} from "react-router-dom";
import ReactDOM from "react-dom";

class Snackbar extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="snackbar">
                <span className="snackbar__text">
                    Товар успешно добавлен в корзину!
                </span>
                {
                    this.props.action ? (
                        <div className="snackbar__aciton">
                            <Link className="snackbar__link" to={this.props.action.action}>
                                {this.props.action.text}
                            </Link>
                        </div>
                    ) : <div></div>
                }
            </div>
        );
    }
}

export default Snackbar;