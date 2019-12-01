import React from "react";
import "./Form.scss";

class Form extends React.Component{
    render(){
        return (
            <div className="form">
                <Header openSearch={this.openSearch} />
                <div className="form__content">
                    <span className="form__title">
                        Оформление заказа
                    </span>
                </div>
                <Search shown={this.state.search} closeHandler={this.closeSearch}/>
            </div>
        );
    }
}