import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import Search from "../../components/Search/Search";
import API from "../../classes/API";
import Good from "../../components/Good/Good";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            goods: [],
            isSuccess: true,
            loading: true,
            message: "",
            search: false,
        }

        this.toggleSearch = this.toggleSearch.bind(this);
    }

    fillGoods(){
        const {type} = this.props.match.params;

        if (type !== "smartphones" && type !== "laptops" && type !== undefined) {
            this.setState({
                ...this.state, 
                loading: false,
                isSuccess: false,
                message: "Указан неправильный тип товара"
            })
        } else {
            API.getGoods(type).then((response) => {
                const { status, goods, message } = response;
                if (status === "Success") {
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
            })
        }
    }

    componentDidMount() {
        this.fillGoods();
    }

    componentDidUpdate(prevProps){
        if(this.props.match.params.type !== prevProps.match.params.type){
            this.fillGoods();
        }
    }
    
    toggleSearch(){
        this.setState(prevState => ({
            search: !prevState.search
        }));
    }

    render(){
        return(
            <div className="home">
                <Header searchHandler={this.toggleSearch} />
                <div className="home__content">
                    {
                        this.state.loading ? (
                            new Array(4).fill().map((_, i) => {
                                return (
                                    <Good key={i} isPreloading={true} />
                                )
                            })
                        ) : (
                            this.state.isSuccess ? (
                                this.state.goods.map((good, i) => {
                                    return (
                                        <Good key={i} good={good} />
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
                <Search shown={this.state.search}/>
            </div>
        );
    }
}

export default Home;