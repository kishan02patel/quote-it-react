import React from 'react'

class EditQuote extends React.Component {
	constructor() {
		super()
		this.state = {
			quote: '',
			author: ''
		}
		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		this.setState({
			quote: this.props.quoteObj.quote,
			author: this.props.quoteObj.author
		})
	}

	handleChange(event) {
		event.persist()
		this.setState({
			[event.target.name]: event.target.value
		})
	}


	render() {
		return (
			<div class="display-quote">
				<textarea cols="50" rows="5" value={this.state.quote} name="quote" onChange={this.handleChange} required></textarea>
				<br /> <br />
				<input type="text" size="50" value={this.state.author} name="author" onChange={this.handleChange} required />
				<br />
				<input type="submit" value="Save" /> &emsp;
				<button onClick={this.props.handleCancel}>Cancel</button>
			</div >
		)
	}
}

export default EditQuote