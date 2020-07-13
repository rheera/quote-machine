import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {QUOTES} from "./quotes"


// Redux

// type is asking for next quote
const NEXT = 'NEXT';

const defaultState = {
    quote: 'Naruto Rules',
    author: 'Raman',
    episode: ''
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
            <div id="background">
                <div id="quote-box" className="col-md-6">
                    <h2>Quote Machine</h2>
                    <button className="btn btn-primary btn-block" id="new-quote" onClick={this.handleChange}>New Quote</button>
                    <q id="text">{this.props.quote}</q>
                    <p id="author">- {this.props.author}</p>
                    <p>{this.props.episode}</p>
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