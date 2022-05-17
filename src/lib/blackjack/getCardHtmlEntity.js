const getCardHtmlEntity = (name, suit) => {
  // Define code for card back.
  const cardBackCode = 127136;

  // Define codes for aces of suits.
  const aceOfSpadesCode = 127137;
  const aceOfHeartsCode = 127153;
  const aceOfDiamondsCode = 127169;
  const aceOfClubsCode = 127185;

  // Define card code.
  let cardCode;

  // Switch on suit.
  switch (suit) {
    case "SPADES":
      // Set card code.
      cardCode = aceOfSpadesCode;
      break;
    case "HEARTS":
      // Set card code.
      cardCode = aceOfHeartsCode;
      break;
    case "DIAMONDS":
      // Set card code.
      cardCode = aceOfDiamondsCode;
      break;
    case "CLUBS":
      // Set card code.
      cardCode = aceOfClubsCode;
      break;
    default:
      // Set card code.
      cardCode = cardBackCode;
      break;
  }

  // If card name is not a number.
  if (isNaN(name)) {
    switch (name) {
      case "Jack":
        // Set card code.
        cardCode += 10;
        break;
      case "Queen":
        // Set card code.
        cardCode += 12;
        break;
      case "King":
        // Set card code.
        cardCode += 13;
        break;
      default:
        break;
    }
  } else {
    // Set card code.
    cardCode += parseInt(name) - 1;
  }

  return "&#" + cardCode;
};

export default getCardHtmlEntity;
