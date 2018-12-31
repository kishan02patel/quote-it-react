import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Link } from 'react-router-dom'
import RandomQuote from './RandomQuote'
import RandomQuoteLocal from './RandomQuoteLocal'
import AddQuote from './AddQuote'
import ListQuotes from './ListQuotes'
import Axios from 'axios';

class App extends Component {
    constructor() {
        super()
        this.state = {
            quoteObj: { isLoading: true }
        }
        this.getRandomQuote = this.getRandomQuote.bind(this)
    }

    componentDidMount() {
        Axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json').then(response => {
            this.setState({
                quoteObj: {
                    quote: response.data.quoteText,
                    author: response.data.quoteAuthor,
                    isLoading: false,
                    getRandomQuote: this.getRandomQuote
                }
            })
        })
    }

    getRandomQuote() {
        this.componentDidMount()
    }

    render() {
        return (
            < BrowserRouter >
                <div className="App">
                    < div >
                        <h1>Quote it!</h1>
                        <span><Link to='/'>Random Quote(API)</Link></span>
                        &emsp; | &emsp;
		                <span><Link to='/rndQuoteLocal'>Random Quote(Local)</Link></span>
                        &emsp;| &emsp;
		                <span><Link to='/addQuote'>Add Quote</Link></span>
                        &emsp;| &emsp;
		                <span><Link to='/listQuotes'>List all Quotes(Local)</Link></span>
                    </div >

                    <Route path='/' render={() => <RandomQuote quoteObj={this.state.quoteObj} />} exact />
                    <Route path='/rndQuoteLocal' component={RandomQuoteLocal} />
                    <Route path='/addQuote' component={AddQuote} />
                    <Route path='/listQuotes' component={ListQuotes} />
                </div>
            </BrowserRouter >
        );
    }
}

export default App;
