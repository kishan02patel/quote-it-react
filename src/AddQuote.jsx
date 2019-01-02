import React from 'react'

class AddQuote extends React.Component {
	constructor() {
		super()
		this.state = {
			quote: '',
			author: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	//Make sure when you manually add a quote add a random quoteLink as it is acting as an unique id while making comparison whether it is saved or not.
	generateRandomQuoteLink() {
		return Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)
	}

	handleSubmit(event) {
		event.preventDefault()
		this.props.addNewQuote({
			quote: this.state.quote,
			author: this.state.author,
			quoteLink: this.generateRandomQuoteLink()
		})
		this.setState({
			quote: '',
			author: ''
		})
	}

	render() {

		return (
			<div>
				<br />
				<form onSubmit={this.handleSubmit}>
					<label>
						Quote: <br />
						<textarea name="quote" value={this.state.quote} onChange={this.handleChange} cols="50" rows="5" required></textarea>
					</label>
					<br /><br />
					<label>
						Author: <br />
						<input name="author" value={this.state.author} onChange={this.handleChange} size="50" required />
					</label>
					<br /><br />
					<input type="submit" value="Add Quote" />
				</form>
			</div>
		)
	}
}

export default AddQuote