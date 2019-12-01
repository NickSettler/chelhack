import React from "react";
import "./Good.scss";
import Cart from "../../classes/Cart";
import {Redirect} from "react-router-dom";
import API from "../../classes/API";

class Good extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            isInCart: false,
            redirectToCart: false,
        }

        this.addToCart = this.addToCart.bind(this);
        this.openItem = this.openItem.bind(this);
    }

    componentDidMount(){
        let item = API.getItemById(+this.props.good.id);
        if(item){
            this.setState({
                ...this.state,
                isInCart: true
            });
        }
    }

    formatPrice(input) {
        return input.toLocaleString('en');
    }

    addToCart(){
        if(this.state.isInCart){
            this.setState({
                ...this.state,
                redirectToCart: true,
            })
        }else{
            Cart.addItem(this.props.good.id);
            this.props.updateHandler();
        }
    }
    openItem(){
        if(!this.props.isPreloading){
            this.setState({
                ...this.state,
                redirect: true
            })
        }
    }

    render(){
        if(this.state.redirect){
            return <Redirect to={'/black-friday/good/'+this.props.good.id} push />
        }
        if(this.state.redirectToCart){
            return <Redirect to={'/black-friday/cart/'} push />
        }
        return (
            <div className="good">
                <div onClick={this.openItem} className={"good__image-block"+(this.props.isPreloading ? " good_loading" : "")}>
                    <img src={this.props.good ? process.env.REACT_APP_BASE_API_URL+this.props.good.imageUrl : ''} className="good__image" />
                </div>
                <div className="good__content">
                    <span onClick={this.openItem} className={"good__title"+(this.props.isPreloading ? " good_loading" : "")}>
                        {this.props.good ? this.props.good.title : ""}
                    </span>
                    <div className="good__down-block">
                        <span onClick={this.openItem} className={"good__subtitle_old"+(this.props.isPreloading ? " good_loading" : "")}>
                            {this.props.good ? `${this.formatPrice(this.props.good.price)} ₽`: ""}
                        </span>
                        <span onClick={this.openItem} className={"good__subtitle_new"+(this.props.isPreloading ? " good_loading" : "")}>
                            {this.props.good ? `${this.formatPrice(this.props.good.finalPrice)} ₽`: ""}
                        </span>
                        <div className="good__buttons">
                            <button className={"good__button"+(this.props.isPreloading ? " good_loading" : "")+(this.state.isInCart ? " good_inCart" : "")} onClick={this.addToCart}>
                                {this.state.isInCart ? ("Уже в корзине") : ("В корзину")}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Good;