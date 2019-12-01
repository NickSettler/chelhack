import React from "react";
import "./Cart.scss";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import API from "../../classes/API";
import Cart from '../../classes/Cart';
import CartItem from "../../components/CartItem/CartItem";
import {Link, Redirect} from "react-router-dom";

class CartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            search: false
        };

        this.clearItems = this.clearItems.bind(this);
        this.fillItems = this.fillItems.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
        this.openForm = this.openForm.bind(this);
    }

    clearItems() {
        this.setState({
            ...this.state,
            items: []
        });

        Cart.clearItems();
    }

    fillItems(){
        this.setState({
            ...this.state,
            items: []
        });


        Cart.getItems().sort((a,b)=>b.id-a.id).forEach(cartItem => {
            API.getGoodById(cartItem.id).then(item => {
                this.setState({
                    ...this.state,
                    items: [
                        ...this.state.items,
                        {
                            ...item,
                            count: cartItem.count
                        }
                    ]
                })
            })
        })
    }

    componentDidMount() {
        this.fillItems();
        console.log(this.state.items);
    }

    formatPrice(price) {
        return price.toLocaleString('en');
    }

    handleChange(){
        this.fillItems();
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

    openForm(){
        this.setState({
            ...this.state,
            redirectToForm: true,
        });
    }

    render(){
        if(this.state.redirectToForm){
            return <Redirect push to="/black-friday/form/" />
        }
        return (
            <div className="cart">
                <Header openSearch={this.openSearch} />
                <div className="cart__content">
                    <div className="cart__header">
                        <span className="cart__title">
                            Корзина
                        </span>
                        <div onClick={this.clearItems} className="cart__clear"></div>
                    </div>
                    {console.log(this.state.items.length)}
                    {this.state.items.length > 0 ? (
                        this.state.items.map((item, i) => {
                            return (
                                <CartItem handleChange={this.handleChange} key={i} item={item} />
                            )
                        })
                    ) : (
                        <span className="cart__empty">
                            <span className="cart__empty-line">
                                Ваша корзина пуста
                            </span>
                            <span className="cart__empty-line">
                                Воспользуйтесь каталогом для добавления товаров
                            </span>
                        </span>
                    )}{this.state.items.length > 0 ? (
                        <span className="cart__total">
                            Итого:
                            {}
                        </span>
                    ) : (
                        <div></div>
                    )}
                    {this.state.items.length > 0 ? (
                        <button onClick={this.openForm} type="button" className="cart__button">Оформить заказ</button>
                    ) : (
                        <div></div>
                    )}
                </div>
                <Search shown={this.state.search} closeHandler={this.closeSearch}/>
            </div>
        );
    }
}

export default CartPage;