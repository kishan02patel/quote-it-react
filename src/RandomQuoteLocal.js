import React from 'react'
import DisplayQuote from './DisplayQuote'

class RandomQuoteLocal extends React.Component {

	componentWillMount() {
		this.props.getRandomQuoteLocal()
	}

	render() {
		return (
			<div>
				<DisplayQuote quoteObj={this.props.randomLocalQuote} />
				<br /><br />
				<button onClick={this.props.getRandomQuoteLocal} >Get another quote</button>
			</div>
		)
	}
}

export default RandomQuoteLocal