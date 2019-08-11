import React, { useState } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = ({ flashcards }) => {
  return {
    flashcards
  }
}

const SolutionBox = ({
  flashcards,
  solution,
  setCurrentCard,
  getRandomIndex,
  setFeedback
}) => {
  const [userSolution, setUserSolution] = useState('')

  const handleSubmit = () => {
    if (parseInt(userSolution) === solution) {
      setFeedback('correct!')
    } else {
      setFeedback('incorrect!')
    }
    setTimeout(() => {
      setCurrentCard(flashcards[getRandomIndex()])
    }, 2000)
  }

  return (
    <form>
      <label>
        Answer
        <input type="text" onChange={ev => setUserSolution(ev.target.value)} />
      </label>
      <button type="button" onClick={() => handleSubmit()}>
        Submit
      </button>
    </form>
  )
}

export default connect(mapStateToProps)(SolutionBox)
