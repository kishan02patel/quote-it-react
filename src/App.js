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
            quoteObj: { isLoading: true },
            quotesArray: []
        }
        this.getRandomQuote = this.getRandomQuote.bind(this)
        this.saveToLocal = this.saveToLocal.bind(this)
    }

    componentWillMount() {
        let getQuotesString = localStorage.getItem('savedQuotes')
        if (getQuotesString) {
            this.setState({
                quotesArray: JSON.parse(getQuotesString)
            })
        }
    }

    componentDidMount() {
        Axios.get('https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json').then(response => {
            if (!response.data.quoteText)
                this.componentDidMount()
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

    stringifyAndSave() {
        localStorage.setItem('savedQuotes', JSON.stringify(this.state.quotesArray))
    }

    saveToLocal() {
        console.log("save to local called")
        if (!this.state.quoteObj.isLoading) {
            this.setState(prevState => ({
                quotesArray: prevState.quotesArray.concat(prevState.quoteObj)
            }), () => this.stringifyAndSave())
        }
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
                        <br /><br />
                    </div >

                    <Route path='/' render={() => <RandomQuote quoteObj={this.state.quoteObj} saveToLocal={this.saveToLocal} />} exact />
                    <Route path='/rndQuoteLocal' component={RandomQuoteLocal} />
                    <Route path='/addQuote' component={AddQuote} />
                    <Route path='/listQuotes' component={ListQuotes} />
                </div>
            </BrowserRouter >
        );
    }
}

export default App;
