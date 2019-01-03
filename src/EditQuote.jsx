import React from 'react'

class EditQuote extends React.Component {
	constructor() {
		super()
		this.state = {
			quote: '',
			author: '',
			quoteLink: ''
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

	componentDidMount() {
		this.setState({
			quote: this.props.quoteObj.quote,
			author: this.props.quoteObj.author,
			quoteLink: this.props.quoteObj.quoteLink
		})
	}

	handleChange(event) {
		event.persist()
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSave(event) {
		event.preventDefault()
		this.props.handleSave({
			quote: this.state.quote,
			author: this.state.author,
			quoteLink: this.state.quoteLink
		})
	}

	render() {
		return (
			<div class="display-quote">
				<form onSubmit={this.handleSave}>
					<textarea cols="50" rows="5" value={this.state.quote} name="quote" onChange={this.handleChange} required></textarea>
					<br /> <br />
					<input type="text" size="50" value={this.state.author} name="author" onChange={this.handleChange} required />
					<br />
					<input type="submit" value="Save" /> &emsp;
					<button onClick={this.props.handleCancel}>Cancel</button>
				</form>
			</div >
		)
	}
}

export default EditQuote