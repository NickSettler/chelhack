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
            page: 0,
            goods: [],
            isSuccess: true,
            loading: true,
            message: "",
            minRam: '',
            maxRam: '',
            minMem: '',
            maxMem: '',
            search: false,
            ramArray: [],
            memArray: [],
        }

        this.changePage = this.changePage.bind(this);

        this.closeSearch = this.closeSearch.bind(this);
        this.openSearch = this.openSearch.bind(this);
        this.goodUpdateHandler = this.goodUpdateHandler.bind(this);

        this.enableFilters = this.enableFilters.bind(this);
        this.resetFilters = this.resetFilters.bind(this);

        this.handleMinRamUpdate = this.handleMinRamUpdate.bind(this);
        this.handleMaxRamUpdate = this.handleMaxRamUpdate.bind(this);
        this.handleMinMemUpdate = this.handleMinMemUpdate.bind(this);
        this.handleMaxMemUpdate = this.handleMaxMemUpdate.bind(this);

        this.handleNumberInput = this.handleNumberInput.bind(this);
    }

    changePage(newPage) {
        const pages = Math.ceil(this.state.goods.length / 12);

        if (newPage >= pages) {
            newPage--;
        }

        if (newPage < 0) {
            newPage = 0;
        }

        this.setState({
            ...this.state,
            page: newPage
        });

        console.log('PAGE CHANGED', this.state.page, newPage);

        return;
    }
    
    fillGoods() {
        const {type} = this.props.match.params;

        let {minRam, maxRam, minMem, maxMem} = this.state;
        
        if (this.state.applyFilters) {
            let filters = {};
            console.log(123);
            
            if (this.state.minRam !== undefined && this.state.maxRam !== undefined) {
                filters['RAM'] = {
                    min: this.state.minRam || 0,
                    max: this.state.maxRam || 100
                };
            }

            if (this.state.minMem !== undefined && this.state.maxMem !== undefined) {
                filters['Mem'] = {
                    min: this.state.minMem || 0,
                    max: this.state.maxMem || 10000
                };
            }

            console.log(filters);
            
            API.getGoodsByFilters(filters).then(array => {
                console.log(array);

                this.setState({
                    ...this.state,
                    goods: array
                });
            });
        } else {
            if(type !== "smartphones" && type !== "laptops" && type !== undefined) {
                this.setState({
                    ...this.state, 
                    loading: false,
                    isSuccess: false,
                    message: "Указан неправильный тип товара",
                    minRam: '',
                    maxRam: '',
                    minMem: '',
                    maxMem: '',
                    applyFilters: false,
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
    }

    componentDidMount() {
        this.fillGoods();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.type !== prevProps.match.params.type){
            this.fillGoods();
        }
        if(this.state.applyFilters !== prevState.applyFilters){
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

    enableFilters(){
        this.fillGoods();

        this.setState({
            ...this.state,
            applyFilters: true,
        })
    }

    resetFilters(){
        this.setState({
            ...this.state, 
            applyFilters: false,
        });
    }

    handleNumberInput(event){
        if(!/\d/.test(event.key)){
            event.preventDefault();
        }
    }

    handleMinRamUpdate(event){
        event.persist();
        this.setState({
            ...this.state,
            minRam: event.target.value
        });
    }
    handleMaxRamUpdate(event){
        event.persist();
        this.setState({
            ...this.state,
            maxRam: +event.target.value
        });
    }
    handleMinMemUpdate(event){
        event.persist();
        this.setState({
            ...this.state,
            minMem: +event.target.value
        });
    }
    handleMaxMemUpdate(event){
        event.persist();
        this.setState({
            ...this.state,
            maxMem: +event.target.value
        });
    }

    render() {
        return(
            <div className="home">

                <Header openSearch={this.openSearch} />
                <div className="home__content">
                    <div className="home__filters-block">
                        <div className="home__filters-content">
                            <div className="home__filter-block">
                                <span className="home__filter-title">Оперативная память</span>
                                <div className="home__filter-input-block">
                                    <input type="text" onKeyPress={this.handleNumberInput} className="home__filter-input" value={this.state.minRam} onChange={this.handleMinRamUpdate} placeholder="От" />
                                    <input type="text" onKeyPress={this.handleNumberInput} className="home__filter-input" value={this.state.maxRam} onChange={this.handleMaxRamUpdate} placeholder="До" />
                                </div>
                            </div>
                            <div className="home__filter-block">
                                <span className="home__filter-title">Физическая память</span>
                                <div className="home__filter-input-block">
                                    <input type="text" onKeyPress={this.handleNumberInput} className="home__filter-input" value={this.state.minMem} onChange={this.handleMinMemUpdate} placeholder="От" />
                                    <input type="text" onKeyPress={this.handleNumberInput} className="home__filter-input" value={this.state.maxMem} onChange={this.handleMaxMemUpdate} placeholder="До" />
                                </div>
                            </div>
                        </div>
                        <div className="home__filters-apply-block">
                            {this.state.applyFilters ? (
                                <button type='button' onClick={this.resetFilters} className="home__filters-apply">
                                    Сбросить фильтры
                                </button>
                            ) : (
                                <div></div>
                            )}
                            
                            <button type='button' onClick={this.enableFilters} className="home__filters-apply">
                                Применить
                            </button>
                        </div>
                    </div>
                    <div className="home__page-controls home__page-controls_up">
                        <div onClick={() => this.changePage(this.state.page - 1)} className="home__page-button">{"<"}</div>
                        {
                            new Array(Math.ceil(this.state.goods.length / 12)).fill().map((_, i) => {
                                return (
                                    <div onClick={() => this.changePage(i)} className={"home__page-button"+(this.state.page === i ? " active" : "")}>{i + 1}</div>
                                )
                            })
                        }
                        <div onClick={() => this.changePage(this.state.page + 1)} className="home__page-button">{">"}</div>
                    </div>
                    {
                        this.state.loading ? (
                            new Array(6).fill().map((_, i) => {
                                return (
                                    <Good key={i} isPreloading={true} good={new GoodItem()} />
                                )
                            })
                        ) : (
                            this.state.isSuccess ? (
                                this.state.applyFilters ? (
                                    this.state.goods.slice(this.state.page * 12, this.state.page * 12 + 12).map((good, i) => {
                                        return (
                                            <Good updateHandler={this.goodUpdateHandler} key={i+6} good={good} />
                                        )
                                    })
                                ) : (
                                    this.state.goods.slice(this.state.page * 12, this.state.page * 12 + 12).map((good, i) => {
                                        return (
                                            <Good updateHandler={this.goodUpdateHandler} key={i+6} good={good} />
                                        )
                                    })
                                )
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
                    <div className="home__page-controls">
                        <div onClick={() => this.changePage(this.state.page - 1)} className="home__page-button">{"<"}</div>
                        {
                            new Array(Math.ceil(this.state.goods.length / 12)).fill().map((_, i) => {
                                return (
                                    <div onClick={() => this.changePage(i)} className={"home__page-button"+(this.state.page === i ? " active" : "")}>{i + 1}</div>
                                )
                            })
                        }
                        <div onClick={() => this.changePage(this.state.page + 1)} className="home__page-button">{">"}</div>
                    </div>
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