export const getRandomIndex = () => {
  return Math.floor(Math.random() * 13)
}

export const compareSolutions = (userSolution, flashcardSolution) => {
  if (parseInt(userSolution, 10) === flashcardSolution) {
    return 'correct'
  }
  return 'incorrect'
}

export const isTimeRemaining = (timeStarted, timeNeeded) => {
  const currentDate = new Date()
  if (
    currentDate.getTime() / 1000 - Date.parse(timeStarted) / 1000 <
    timeNeeded
  ) {
    return true
  }
}

export const sessionCardExists = (
  sessionId,
  flashcardId,
  sessionCardsOnState
) => {
  return sessionCardsOnState.find(
    c => c.sessionId === sessionId && c.flashcardId === flashcardId
  )
}
