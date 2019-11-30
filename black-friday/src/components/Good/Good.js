import React from "react";
import "./Good.scss";

class Good extends React.Component{
    constructor(props){
        super(props);
    }

    formatPrice(input) {
        return input.toLocaleString('en');
    }

    render(){
        return (
            <div className="good">
                <div className={"good__image-block"+(this.props.isPreloading ? " good_loading" : "")}>
                    <img src={this.props.good ? process.env.REACT_APP_BASE_API_URL+this.props.good.imageUrl : ''} className="good__image" />
                </div>
                <div className="good__content">
                    <span className={"good__title"+(this.props.isPreloading ? " good_loading" : "")}>
                        {this.props.good ? this.props.good.title : ""}
                    </span>
                    <div className="good__down-block">
                        <span className={"good__subtitle_old"+(this.props.isPreloading ? " good_loading" : "")}>
                            {this.props.good ? `${this.formatPrice(this.props.good.price)} ₽`: ""}
                        </span>
                        <span className={"good__subtitle_new"+(this.props.isPreloading ? " good_loading" : "")}>
                            {this.props.good ? `${this.formatPrice(this.props.good.finalPrice)} ₽`: ""}
                        </span>
                        <div className="good__buttons">
                            <button className={"good__button"+(this.props.isPreloading ? " good_loading" : "")}>
                                В корзину
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Good;