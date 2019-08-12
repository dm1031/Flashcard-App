import React, { useState } from 'react'
import { connect } from 'react-redux'

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

const SolutionBox = ({ flashcard, session, getFlashcard, addSessionCard }) => {
  const [userSolution, setUserSolution] = useState('')
  const [feedback, setFeedback] = useState('')

  const compareSolutions = (userSolution, flashcardSolution) => {
    if (parseInt(userSolution, 10) === flashcardSolution) {
      return 'correct'
    }
    return 'incorrect'
  }

  const handleSubmit = ev => {
    const result = compareSolutions(userSolution, flashcard.solution)
    addSessionCard(session.id, flashcard.id, result).then(action => {
      const { sessionCard } = action
      setFeedback(sessionCard.result)
    })
    setUserSolution('')
    getFlashcard()
    ev.preventDefault()
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Answer
          <input
            type="text"
            value={userSolution}
            onChange={ev => setUserSolution(ev.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>{feedback ? feedback : ''}</div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SolutionBox)
