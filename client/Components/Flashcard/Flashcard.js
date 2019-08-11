import React, { useState } from 'react'
import { connect } from 'react-redux'
import SolutionBox from '../SolutionBox'

const mapStateToProps = ({ flashcards }) => {
  return {
    flashcards
  }
}

const Flashcard = ({ flashcards }) => {
  const getRandomIndex = () => {
    return Math.floor(Math.random() * 13)
  }

  const [currentCard, setCurrentCard] = useState(flashcards[getRandomIndex()])
  const [feedback, setFeedback] = useState('')

  return (
    <div>
      <div>{currentCard ? currentCard.prompt : ''}</div>
      <div>{feedback ? feedback : ''}</div>
      <SolutionBox
        solution={currentCard ? currentCard.solution : ''}
        setCurrentCard={setCurrentCard}
        getRandomIndex={getRandomIndex}
        setFeedback={setFeedback}
      />
    </div>
  )
}

export default connect(mapStateToProps)(Flashcard)
