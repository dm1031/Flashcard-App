import React, { Component } from 'react'
import { connect } from 'react-redux'

import { compareSolutions, sessionCardExists } from '../../Utilities'

import {
  addSessionCardThunk,
  updateSessionCardThunk
} from '../../store/sessionCard/action'

const mapStateToProps = ({ flashcard, session, sessionCard }) => {
  return {
    flashcard,
    session,
    sessionCard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addSessionCard: (sessionId, flashcardId, result) =>
      dispatch(addSessionCardThunk({ sessionId, flashcardId, result })),
    updateSessionCard: (sessionCardId, result) =>
      dispatch(updateSessionCardThunk(sessionCardId, result))
  }
}

class SolutionBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      field: this.props.solution,
      feedback: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    const {
      session,
      flashcard,
      sessionCard,
      flashcardType,
      handleFlashcard,
      solution
    } = this.props

    const result = compareSolutions(parseInt(solution, 10), flashcard.solution)

    const foundSessionCard = sessionCardExists(
      session.id,
      flashcard.id,
      sessionCard
    )

    let verb
    let args

    if (foundSessionCard) {
      verb = 'update'
      args = [foundSessionCard.id, result]
    } else {
      verb = 'add'
      args = [session.id, flashcard.id, result]
    }

    this.props[`${verb}SessionCard`](...args).then(action => {
      const { sessionCard } = action
      this.setState({ feedback: sessionCard.result })
      handleFlashcard(flashcardType)
    })
    this.setState({ field: '' })
    e.preventDefault()
  }

  render() {
    const { field, feedback } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Answer:
            <input
              type='text'
              value={field}
              onChange={e => this.setState({ field: e.target.value })}
            />
            <input type='submit' value='Submit' />
          </label>
        </form>
        {feedback ? feedback : ''}
      </div>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolutionBox)
