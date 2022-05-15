const scoreHand = (hand) => {
  // If hand length is zero, return 0.
  if (hand.length === 0) return 0;

  // Pull aces out of the hand.
  const aces = hand.filter((card) => card.name === "Ace");

  // Score all non-aces.
  const nonAcesScore = hand
    .filter((card) => card.name !== "Ace")
    .map((card) => (isNaN(card.name) ? 10 : parseInt(card.name)))
    .reduce((a, b) => a + b, 0);

  // Calculate lowest possible score.
  let score = (aces && aces.length * 1) + nonAcesScore;

  // Loop over aces to determine highest possible score.
  aces.forEach(() => {
    // If ace can be valued at 11.
    if (score + 10 <= 21) {
      // Increment score.
      score += 10;
    }
  });

  return score;
};

export default scoreHand;
