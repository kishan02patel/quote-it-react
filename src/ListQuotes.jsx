import React from 'react'
import DisplayQuote from './DisplayQuote';
import EditQuote from './EditQuote'

class ListQuotes extends React.Component {
	constructor() {
		super()
		this.state = {
			isEditing: false
		}
		this.handleDelete = this.handleDelete.bind(this)
		this.handleEdit = this.handleEdit.bind(this)
		this.handleCancel = this.handleCancel.bind(this)
	}

	handleDelete(event) {
		event.persist()
		this.props.deleteSavedQuote(event.target.id)
	}

	handleEdit(event) {
		event.persist()
		this.setState({
			isEditing: true,
			eventId: event.target.id
		})
	}

	handleCancel() {
		this.setState({
			isEditing: false
		})
	}

	render() {
		return (
			<div>
				{
					this.props.quotesArray.map(quoteObj => {
						return (
							<div key={quoteObj.quoteLink}>
								{
									this.state.isEditing && this.state.eventId === quoteObj.quoteLink ? <EditQuote quoteObj={quoteObj} handleCancel={this.handleCancel} /> :
										<div class="display-quote">
											<DisplayQuote quoteObj={quoteObj} />
											<div class='edit-delete-bar'>
												<button><i class='material-icons' id={quoteObj.quoteLink} onClick={this.handleEdit}>edit</i></button>
												<button><i class='material-icons' onClick={this.handleDelete} id={quoteObj.quoteLink}>delete</i></button>
											</div>
										</div>
								}
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