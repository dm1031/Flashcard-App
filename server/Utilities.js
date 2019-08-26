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

module.exports = {
  getAvailableFlashcardsByResult
}
