import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import API from "../../classes/API";
import Good from "../../components/Good/Good";
import {Good as GoodItem} from "../../classes/API";
import Snackbar from "../../components/Snackbar/Snackbar";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            goods: [],
            isSuccess: true,
            loading: true,
            message: "",
            search: false,
        }


        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
        this.goodUpdateHandler = this.goodUpdateHandler.bind(this);
    }

    fillGoods() {
        const {type} = this.props.match.params;

        if (type !== "smartphones" && type !== "laptops" && type !== undefined) {
            this.setState({
                ...this.state, 
                loading: false,
                isSuccess: false,
                message: "Указан неправильный тип товара"
            });
        } else {
            API.getGoods(type, true).then((response) => {
                const { status, goods, message } = response;
                if (status === "Success") {
                    this.setState({
                        ...this.state,
                        goods: []
                    });
                    this.setState({
                        ...this.state,
                        goods,
                        loading: false,
                    });
                } else {
                    console.log(response);
                    this.setState({
                        ...this.state,
                        message,
                        loading: false,
                        isSuccess: false,
                    });
                }
            });
        }
    }

    componentDidMount() {
        this.fillGoods();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.type !== prevProps.match.params.type){
            this.fillGoods();
        }
    }

    goodUpdateHandler(){
        this.fillGoods();
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

    render() {
        return(
            <div className="home">

                <Header openSearch={this.openSearch} />
                <div className="home__content">
                    {
                        this.state.loading ? (
                            new Array(6).fill().map((_, i) => {
                                return (
                                    <Good key={i} isPreloading={true} good={new GoodItem()} />
                                )
                            })
                        ) : (
                            this.state.isSuccess ? (
                                this.state.goods.map((good, i) => {
                                    return (
                                        <Good updateHandler={this.goodUpdateHandler} key={i+6} good={good} />
                                    )
                                })
                            ) : (
                                <div className="home__error-container">
                                    <span className="home__error">Произошла ошибка:</span>
                                    <span className="home__error-details">
                                        {this.state.message}
                                    </span>
                                </div>
                            )
                        )
                    }
                </div>

                <Search shown={this.state.search} closeHandler={this.closeSearch}/>
                <Snackbar action={{
                    text: "В корзину",
                    action: "/black-friday/cart"
                }} />
            </div>
        );
    }
}

export default Home;