import React from "react";
import "./GoodPage.scss";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import API from "../../classes/API";
import Cart from "../../classes/Cart";
import {Redirect} from "react-router-dom";

class GoodPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            good: {},
            search: false,
            redirect: false,
        }

        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
        this.back = this.back.bind(this);
        this.addCart = this.addCart.bind(this);
    }

    componentDidMount(){
        API.getGoodById(+this.props.match.params.id).then(good => {
            console.log(good);
            this.setState({
                ...this.state, 
                good
            })
        })
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

    back(){
        this.setState({
            ...this.state,
            redirect: true
        })
    }

    addCart(){
        Cart.addItem(this.state.good.id);
    }

    formatPrice(price = 0) {
        return price.toLocaleString('en');
    }

    render(){
        if(this.state.redirect){
            return <Redirect to="/black-friday" push />
        }
        return(
            <div className="good-page">
                <Header openSearch={this.openSearch} />
                <div className="good-page__header">
                    <div className="good-page__header-back" onClick={this.back}></div>
                </div>
                <div className="good-page__content">
                    <div className="good-page__image-block">
                        <img className="good-page__image" src={this.state.good ? (process.env.REACT_APP_BASE_API_URL+this.state.good.imageUrl) : ("")} /> 
                        <button type="button" className="good-page__button" onClick={this.addCart}>Добавить в корзину</button>
                    </div>
                    <div className="good-page__content-block">
                        <span className="good-page__title">
                            {this.state.good.title}
                        </span>
                        <span className="good-page__brand">
                            {this.state.good.brand}
                        </span>
                        <span className="good-page__count">
                            В наличии: {this.state.good.quantity}шт.
                        </span>
                        <span className="good-page__price_old">
                            {this.formatPrice(this.state.good.price)}₽
                        </span>
                        <span className="good-page__price_new">
                            {this.formatPrice(this.state.good.finalPrice)}₽
                        </span>
                        <span className="good-page__table-title">
                            Характеристики
                        </span>
                        {this.state.good.parameters ? (this.state.good.parameters.map((param, i) => (
                                <div key={i} className="good-page__table">
                                    <div className="good-page__table-row">
                                        <div className="good-page__table-cell">
                                            {param.title}
                                        </div>
                                        <div className="good-page__table-cell">
                                            {param.value}
                                        </div>
                                    </div>
                                </div>
                            ))) : (<div></div>)}
                    </div>
                </div>
                <Search shown={this.state.search} closeHandler={this.closeSearch}/>
            </div>
        );
    }
}

export default GoodPage;