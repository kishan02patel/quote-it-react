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
            quoteObj: {},
            quoteAttributes: { isLoading: true },
            quotesArray: [],
            isPresent: false,
            randomLocalQuote: ''
        }
        this.getRandomQuote = this.getRandomQuote.bind(this)
        this.getRandomQuoteLocal = this.getRandomQuoteLocal.bind(this)
        this.saveToLocal = this.saveToLocal.bind(this)
        this.addNewQuote = this.addNewQuote.bind(this)
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
                    quoteLink: response.data.quoteLink
                },
                quoteAttributes: {
                    isLoading: false,
                    getRandomQuote: this.getRandomQuote
                }
            }, () => this.checkAlreadySaved())
        })
    }

    getRandomQuoteLocal() {
        let arrayLength = this.state.quotesArray.length
        if (arrayLength > 0) {
            let randomNumber = Math.floor(Math.random() * arrayLength)
            this.setState(prevState => ({
                randomLocalQuote: prevState.quotesArray[randomNumber]
            }))
        }
    }

    stringifyAndSave() {
        localStorage.setItem('savedQuotes', JSON.stringify(this.state.quotesArray))
    }

    saveToLocal() {
        if (!this.state.quoteAttributes.isLoading) {
            this.setState(prevState => ({
                quotesArray: prevState.quotesArray.concat(prevState.quoteObj),
                isPresent: true
            }), () => this.stringifyAndSave())
        }

    }

    checkAlreadySaved() {
        let found = this.state.quotesArray.find(quote => quote.quoteLink === this.state.quoteObj.quoteLink)
        if (found) {
            this.setState({
                isPresent: true
            })
        }
    }

    getRandomQuote() {
        this.setState({
            isPresent: false
        }, () => this.componentDidMount())
    }

    addNewQuote(quoteObj) {
        this.setState({
            quoteObj: quoteObj
        }, () => this.saveToLocal())
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

                    <Route path='/' render={() => <RandomQuote quoteObj={this.state.quoteObj} quoteAttributes={this.state.quoteAttributes} saveToLocal={this.saveToLocal} isPresent={this.state.isPresent} />} exact />

                    <Route path='/rndQuoteLocal' render={() => <RandomQuoteLocal getRandomQuoteLocal={this.getRandomQuoteLocal} randomLocalQuote={this.state.randomLocalQuote} />} />

                    <Route path='/addQuote' render={() => <AddQuote addNewQuote={this.addNewQuote} />} />

                    <Route path='/listQuotes' component={ListQuotes} />
                </div>
            </BrowserRouter >
        );
    }
}

export default App;
