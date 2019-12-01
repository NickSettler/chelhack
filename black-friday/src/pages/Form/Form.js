import React from "react";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import "./Form.scss";

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            search: false,
            isSent: false,
            name: '',
            surname: '',
            phone: '',
        }

        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
        this.submit = this.submit.bind(this);

        this.handleNameInput = this.handleNameInput.bind(this)
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

    handleNameInput(event){
        event.persist();
        this.setState({
            ...this.state, 
            name: event.target.value
        });
    }
    handleSurnameInput(event){
        event.persist();
        this.setState({
            ...this.state, 
            surname: event.target.value
        });
    }
    handlePhoneInput(event){
        event.persist();
        this.setState({
            ...this.state, 
            phone: event.target.value
        });
    }

    submit(){

    }

    render(){
        return (
            <div className="form">
                <Header openSearch={this.openSearch} />
                <div className="form__content">
                    <span className="form__title">
                        Оформление заказа
                    </span>
                    <input type="text" className="form__input" onChange={this.handleNameInput} placeholder="Имя" />
                    <input type="text" className="form__input" onChange={this.handleSurnameInput} placeholder="Фамилия" />
                    <input type="phone" className="form__input" onChange={this.handlePhoneInput} placeholder="Телефон" />

                    <button type="button" onClick={this.submit} className="form__button">Подтвердить</button>
                </div>
                <Search shown={this.state.search} closeHandler={this.closeSearch}/>
            </div>
        );
    }
}

export default Form;