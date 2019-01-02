import React from 'react'
import DisplayQuote from './DisplayQuote';

class ListQuotes extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.quotesArray.map(quoteObj => {
						return (
							<div>
								<DisplayQuote quoteObj={quoteObj} />
								<hr width="60%" />
							</div>
						)
					})
				}
			</div>
		)
	}
}

export default ListQuotes