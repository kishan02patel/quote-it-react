import React from 'react'
import DisplayQuote from './DisplayQuote';

class RandomQuote extends React.Component {


	render() {
		return (
			<div>
				<DisplayQuote quoteObj={this.props.quoteObj} />
				<button onClick={this.props.quoteObj.getRandomQuote}>CLick me</button>
			</div>
		)
	}
}

export default RandomQuote