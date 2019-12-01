import React from "react";
import "./Search.scss";
import API from "../../classes/API";
import Good from "../../components/Good/Good";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";

class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            query: this.props.match.params.query || "",
        };

        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.goodUpdateHandler = this.goodUpdateHandler.bind(this);
    }

    handleInputChange(event){
        event.persist();
        console.log(event.target.value);
        this.setState({
            ...this.state,
            query: event.target.value
        })
        API.searchGoods(event.target.value).then(goods => {
            console.log(goods);
            this.setState({
                ...this.state,
                goods: goods.goods
            })
        })
    }

    goodUpdateHandler(){
        API.searchGoods(this.state.query).then(goods => {
            console.log(goods);
            this.setState({
                ...this.state,
                goods: []
            })
            this.setState({
                ...this.state,
                goods: goods.goods
            })
        })
    }

    componentDidMount(){
        API.searchGoods(this.state.query).then(goods => {
            console.log(goods);
            this.setState({
                ...this.state,
                goods: goods.goods
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

    render(){
        return (
            <div className="search">
                <Header openSearch={this.openSearch} />
                <div className="search__content">
                    <div className="search__header">
                        <span className="search__title">Поиск</span>
                        <div className="search__form-block">
                            <span className="search__form-title">Введите запрос</span>
                            <input type="text" className="search__form-input" value={this.state.query} onChange={this.handleInputChange} onKeyPress={this.search} />
                        </div>
                    </div>
                    <div className="search__items">
                        {
                            this.state.goods.map((good, i) => {
                                return(
                                    <Good updateHandler={this.goodUpdateHandler} key={i} good={good} />
                                )
                            })
                        }
                    </div>
                </div>
                <Search shown={this.state.search} closeHandler={this.closeSearch}/>
            </div>
        );
    }
}

export default SearchPage;