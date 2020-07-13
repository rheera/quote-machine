import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {QUOTES} from "./quotes"
import './style.scss';
import 'font-awesome/css/font-awesome.min.css';


//TODO comment and make quote box in the middle of the page vertically

// Redux

// type is asking for next quote
const NEXT = 'NEXT';

let randomNum = Math.floor(Math.random() * QUOTES.length);

const defaultState = {
    quote: QUOTES[randomNum].quote,
    author: QUOTES[randomNum].author,
    episode: QUOTES[randomNum].episode
};

const nextQuote = () => {
    return {
        type: NEXT
    }
};

const quoteReducer = (state = defaultState, action) => {
    switch (action.type) {
        case NEXT:
            let randomNum = Math.floor(Math.random() * QUOTES.length);
            return {
                quote: QUOTES[randomNum].quote,
                author: QUOTES[randomNum].author,
                episode: QUOTES[randomNum].episode
            }
        default:
            return state;
    }
};

export const store = createStore(quoteReducer);

// React

class QuoteMachine extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange() {
        this.props.submitNewQuote()
    }
    render() {
        function random_bg_color() {
            let x = Math.floor(Math.random() * 256);
            let y = Math.floor(Math.random() * 256);
            let z = Math.floor(Math.random() * 256);
            return "rgba(" + x + "," + y + "," + z + "," + 0.5 + ")";
        }
        let randCol = random_bg_color();
        return (
            <div id="background" className="min-vh-100" style = {{backgroundColor: randCol}}>
                <div className="row justify-content-md-center">
                    <div id="quote-box" className="col-md-6 jumbotron min-vh-50">
                        <h2 className="text-center">Quote Machine</h2>
                        <p id="text" className="text-center">"{this.props.quote}"</p>
                        <p id="author" className="font-weight-bold font-italic text-center">- {this.props.author}</p>
                        {/*<p>{this.props.episode}</p>*/}
                        <div className="row justify-content-md-center">
                            <a href={"https://twitter.com/intent/tweet?text=" + this.props.quote + "%0A- " +
                            this.props.author} className="col-md-2" id="tweet-quote" target="_blank">
                                <i className="fa fa-twitter" id="twitter-icon"  style = {{color: randCol}}></i></a>
                            <button className="btn col-xs-3" id="new-quote"
                                    style = {{backgroundColor: randCol, color: "#FFF"}}
                                    onClick={this.handleChange}>New Quote</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

// React Redux
const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitNewQuote: () => {
            dispatch(nextQuote())
        }
    }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(QuoteMachine);

class AppWrapper extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Container/>
            </Provider>
        );
    }
};

export default AppWrapper;