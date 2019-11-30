import React from "react";
import "./Home.scss";
import Header from "../../components/Header/Header";
import API from "../../classes/API";
import Good from "../../components/Good/Good";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            goods: []
        }
    }

    componentWillMount() {
        API.getGoods().then(goods => {
            this.setState({
                ...this.state,
                goods
            });
        })
    }

    componentWillUpdate() {
    }

    render(){
        return(
            <div className="home">
                <Header />
                <div className="home__content">
                    {this.state.goods.map((good, i) => {
                        return (
                            <Good key={i} good = {good}/>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default Home;