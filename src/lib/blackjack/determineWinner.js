const determineWinner = (
  dealerScore,
  dealerStays,
  playerScore,
  roundStarted
) => {
  // Define winner.
  let winner = false;

  // If not round started, return.
  if (!roundStarted) return winner;

  // If dealer score is > 21.
  if (dealerScore > 21) {
    // Set winner.
    winner = "Player";

    return winner;
  }

  // If player score is > 21.
  if (playerScore > 21) {
    // Set winner.
    winner = "Dealer";

    return winner;
  }

  // If dealer score is 21.
  if (dealerScore === 21) {
    // Set winner.
    winner = "Dealer";

    return winner;
  }

  // If player score is 21.
  if (playerScore === 21) {
    // Set winner.
    winner = "Player";

    return winner;
  }

  // If not dealer stays.
  if (!dealerStays) {
    return winner;
  }

  // If dealer score is greater than player score.
  if (dealerScore > playerScore) {
    // Set winner.
    winner = "Dealer";

    return winner;
  }

  // If player score is greater than player score.
  if (playerScore > dealerScore) {
    // Set winner.
    winner = "Player";

    return winner;
  }

  // If dealer score is equal to player score.
  if (dealerScore === playerScore) {
    // Set winner.
    winner = "Dealer";

    return winner;
  }

  return false;
};

export default determineWinner;
