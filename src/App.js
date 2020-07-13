import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {QUOTES} from "./quotes"


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
        return (
            <div id="background" className="min-vh-100">
                <div className="row justify-content-md-center">
                    <div id="quote-box" className="col-md-6 jumbotron min-vh-50">
                        <h2 className="text-center">Quote Machine</h2>
                        <p id="text" className="text-center">"{this.props.quote}"</p>
                        <p id="author" className="font-weight-bold font-italic text-center">- {this.props.author}</p>
                        {/*<p>{this.props.episode}</p>*/}
                        <div className="row justify-content-md-center">
                            <a href="#" className="col-md-2" id="tweet-quote"><i className="fa fa-twitter"></i></a>
                            <button className="btn btn-primary col-xs-3" id="new-quote" onClick={this.handleChange}>New Quote</button>
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