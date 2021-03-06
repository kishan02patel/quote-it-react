import React from 'react'
import DisplayQuote from './DisplayQuote';

class RandomQuote extends React.Component {

	render() {
		return (
			<div>
				<DisplayQuote quoteObj={this.props.quoteObj} />
				<div class='save-btn'>
					<button onClick={this.props.saveToLocal} disabled={this.props.isPresent ? 'disabled' : ''} ><i class='material-icons'>bookmark</i>Save Quote</button>
				</div>
				<br />
				<button onClick={this.props.quoteAttributes.getRandomQuote} >Get another quote</button>
			</div>
		)
	}
}

export default RandomQuote