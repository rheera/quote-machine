import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const QUOTES = [
    {
        quote: "Never give up without even trying. Do what you can, no matter how small the effect it may have!",
        author: 'Onoki',
        episode: 'episode1'
    },
    {
        quote: "When people are protecting something truly precious to them. They truly can become…as strong as they need to be!",
        author: 'Haku',
        episode: 'episode2'
    },
    {
        quote: "A person grows up when he’s able to overcome hardships. Protection is important, but there are some things that a person must learn on his own",
        author: 'Jiraiya',
        episode: 'episode2'
    },
    {
        quote: "Rejection is a part of any man’s life. If you can’t accept and move past rejection, or at least use it as writing material – you’re not a real man",
        author: 'Jiraiya',
        episode: 'episode2'
    },
    {
        quote: "A place where someone still thinks about you is a place you can call home.",
        author: 'Jiraiya',
        episode: 'episode2'
    },
    {
        quote: "Even I can tell that hatred is spreading. I wanted to do something about it…but I don’t know what. I believe… that someday the day will come when people truly understand one another!",
        author: 'Jiraiya',
        episode: 'episode2'
    },
    {
        quote: "Hard work is worthless for those that don’t believe in themselves.",
        author: 'Naruto Uzamaki',
        episode: 'episode2'
    },
    {
        quote: "If you don’t like your destiny, don’t accept it. Instead have the courage to change it the way you want it to be",
        author: 'Naruto Uzamaki',
        episode: 'episode2'
    },
    {
        quote: "Once you question your own belief, it’s over.",
        author: 'Naruto Uzamaki',
        episode: 'episode2'
    },
    {
        quote: "It’s not the face that makes someone a monster, it’s the choices they make with their lives",
        author: 'Naruto Uzamaki',
        episode: 'episode2'
    },
    {
        quote: "While you’re alive, you need a reason for your existence. Being unable to find one is the same as being dead.",
        author: 'Naruto Uzamaki',
        episode: 'episode2'
    },
    {
        quote: "If you don’t like the hand that fate’s dealt you with, fight for a new one!",
        author: 'Naruto Uzamaki',
        episode: 'episode2'
    }
];
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
            <div>
                <h2>Quote Machine</h2>
                <button onClick={this.handleChange}>New Quote</button>
                <q>{this.props.quote}</q>
                <p>- {this.props.author}</p>
                <p>{this.props.episode}</p>
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