import React from 'react'
import './DisplayQuote.css'

class DisplayQuote extends React.Component {
	render() {
		return (
			<div>
				{this.props.quoteObj.quote}
				<br />~
				{this.props.quoteObj.author}
			</div>

		)
	}
}

export default DisplayQuote