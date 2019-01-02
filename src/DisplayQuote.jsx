import React from 'react'

class DisplayQuote extends React.Component {
	render() {
		return (
			<div class="display-quote">
				{this.props.quoteObj.quote}
				<br />~
				{this.props.quoteObj.author}
			</div>

		)
	}
}

export default DisplayQuote