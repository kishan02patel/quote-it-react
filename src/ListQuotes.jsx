import React from 'react'
import DisplayQuote from './DisplayQuote';

class ListQuotes extends React.Component {
	constructor() {
		super()
		this.handleDelete = this.handleDelete.bind(this)
	}

	handleDelete(event) {
		event.persist()
		this.props.deleteSavedQuote(event.target.id)
	}

	render() {
		return (
			<div>
				{
					this.props.quotesArray.map(quoteObj => {
						return (
							<div key={quoteObj.quoteLink}>
								<div class="display-quote">
									<DisplayQuote quoteObj={quoteObj} />
									<div class='edit-delete-bar'>
										<button><i class='material-icons'>edit</i></button>
										<button><i class='material-icons' onClick={this.handleDelete} id={quoteObj.quoteLink}>delete</i></button>
									</div>
								</div>
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