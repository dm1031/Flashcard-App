import React, { Component } from 'react'
import { connect } from 'react-redux'

import { compareSolutions } from '../../Utilities'

import { addSessionCardThunk } from '../../store/sessionCard/action'

const mapStateToProps = ({ flashcard, session }) => {
  return {
    flashcard,
    session
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSessionCard: (sessionId, flashcardId, result) =>
      dispatch(addSessionCardThunk({ sessionId, flashcardId, result }))
  }
}

class SolutionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      field: '',
      feedback: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const result = compareSolutions(
      parseInt(this.state.field, 10),
      this.props.flashcard.solution
    )
    this.props
      .addSessionCard(this.props.session.id, this.props.flashcard.id, result)
      .then(action => {
        const { sessionCard } = action
        this.setState({ feedback: sessionCard.result })
      })
    this.setState({ field: '' })
    this.props.getFlashcard()
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer:
            <input
              type="text"
              value={this.state.field}
              onChange={e => this.setState({ field: e.target.value })}
            />
            <input type="submit" value="Submit" />
          </label>
        </form>
        {this.state.feedback ? this.state.feedback : ''}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolutionBox)
