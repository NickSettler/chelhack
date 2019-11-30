import React from "react";
import "./Header.scss";

class Header extends React.Component{
    render(){
        return(
            <header className="header">
                <div className="header__logo">
                    <span className="header__logo-letter">B</span>
                    <span className="header__logo-text">Friday</span>
                </div>
                <nav className="header__menu">
                    <div className="header__link">Smartphones</div>
                    <div className="header__link">Laptops</div>
                </nav>
            </header>
        )
    }
}

export default Header;