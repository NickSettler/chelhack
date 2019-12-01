import React from "react";
import "./Header.scss";
import {Link} from "react-router-dom";

class Header extends React.Component{
    constructor(props){
        super(props);

        this.showParentSearch = this.showParentSearch.bind(this);
    }

    showParentSearch(){
        this.props.openSearch();
    }

    render(){
        return(
            <header className="header">
                <div className="header__logo">
                    <Link className="header__link-block header__logo-block" to="/black-friday">
                        <span className="header__logo-letter">B</span>
                        <span className="header__logo-text">Friday</span>
                    </Link>
                </div>
                <nav className="header__menu">
                    <div className="header__link" onClick={this.showParentSearch}>Поиск</div>
                    <Link className="header__link-block" to="/black-friday/filter/smartphones"><div className="header__link">Смартфоны</div></Link>
                    <Link className="header__link-block" to="/black-friday/filter/laptops"><div className="header__link">Ноутбуки</div></Link>
                    <Link className="header__link-block" to="/black-friday/cart"><div className="header__link">Корзина</div></Link>
                </nav>
            </header>
        )
    }
}

export default Header;