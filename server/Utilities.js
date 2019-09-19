const getAvailableFlashcardsByResult = (sessionCards, flashcards, result) => {
  if (sessionCards) {
    const arrayOfFlashcardIds = sessionCards.map(card => card.flashcardId)
    return flashcards.filter(
      result === 'all'
        ? flashcard => arrayOfFlashcardIds.indexOf(flashcard.id) === -1
        : flashcard => arrayOfFlashcardIds.indexOf(flashcard.id) > -1
    )
  } else {
    return flashcards
  }
}

const isFlashcardWithCorrectRootFactor = (flashcard, factors) => {
  for (let i = 0; i < factors.length; ++i) {
    if (factors[i] === flashcard.rootFactor) {
      return true
    }
  }
  return false
}

module.exports = {
  getAvailableFlashcardsByResult,
  isFlashcardWithCorrectRootFactor
}
