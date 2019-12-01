import React from "react";
import "./CartItem.scss";
import Cart from "../../classes/Cart";

class CartItem extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            count: this.props.item.count
        }

        this.plusItem = this.plusItem.bind(this);
        this.minusItem = this.minusItem.bind(this);
        this.handleCountChange = this.handleCountChange.bind(this);
    }

    parseInputCount(event){
        if(!/\d/.test(event.key)){
            event.preventDefault();
        }
    }
    handleCountChange(event){
        event.persist();
        this.setState({
            ...this.state,
            count: event.target.value
        });
        Cart.editItem(+this.props.item.id, +event.target.value);
    }

    formatPrice(price) {
        return price.toLocaleString('en');
    }

    plusItem(){
        Cart.addItem(+this.props.item.id);
        this.props.handleChange();
    }
    minusItem(){
        Cart.removeItem(+this.props.item.id);
        this.props.handleChange();
    }

    render(){
        return(
            <div className="cart-item">
                <img src={process.env.REACT_APP_BASE_API_URL + this.props.item.imageUrl} className="cart-item__image" />
                <div className="cart-item__content">
                    <span className="cart-item__title">{this.props.item.title}</span>
                    <div className="cart-item__count">
                        <div className="cart-item__button" onClick={this.minusItem}>-</div>
                        <input maxLength="3" type="text" onKeyPress={this.parseInputCount} className="cart-item__count-text" onChange={this.handleCountChange} value={this.state.count} />
                        <div className="cart-item__button" onClick={this.plusItem}>+</div>
                    </div>
                    <span className="cart-item__total">
                        Итого: {this.formatPrice(this.props.item.finalPrice * this.state.count).replace(/,/g, ' ')}₽
                    </span>
                </div>
            </div>
        )
    }
}

export default CartItem;