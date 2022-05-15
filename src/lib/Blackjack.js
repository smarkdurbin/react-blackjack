/**
 * @class
 * @author Mark Durbin
 */
export default class Blackjack {
  /**
   * @property {array} dealerHand - The dealer's hand.
   */
  dealerHand;

  /**
   * @property {number} dealerScore - The dealer's score.
   */
  dealerScore;

  /**
   * @property {boolean} dealerStays - True if dealer doesn't want to hit.
   */
  dealerStays;

  /**
   * @property {array} gameOver - True if game is over.
   */
  gameOver;

  /**
   * @property {number} playerBank - The player's bank.
   */
  playerBank;

  /**
   * @property {number} playerBet - The player's bet.
   */
  playerBet;

  /**
   * @property {number} playerHand - The player's hand.
   */
  playerHand;

  /**
   * @property {number} playerStays - True if player doesn't want to hit.
   */
  playerStays;

  /**
   * @property {array} rounds - All game rounds.
   */
  rounds = [];

  /**
   * @property {array} roundOver - True if round is over.
   */
  roundStarted;

  /**
   * @property {array} shoe - The shoe of cards.
   */
  shoe;

  /**
   * @property {string} winner - The winner
   */
  winner;

  constructor() {
    // Set game over.
    this.gameOver = false;

    // Set player bank.
    this.playerBank = 100;

    // Set player bet.
    this.playerBet = 10;

    // Set stays.
    this.dealerStays = false;
    this.playerStays = false;

    // Set hands.
    this.dealerHand = [];
    this.playerHand = [];

    // Set scores.
    this.dealerScore = 0;
    this.playerScore = 0;

    // Set round started.
    this.roundStarted = false;

    // Set winner.
    this.winner = false;

    // Fill shoe.
    this.fillShoe();
  }

  /**
   * Check for winner.
   */
  checkForWinner = async () => {
    // If not round started, return.
    if (!this.roundStarted) return;

    // If dealer score is > 21.
    if (this.dealerScore > 21) {
      // Set winner.
      this.winner = "Player";

      // End round.
      await this.endRound();

      return;
    }

    // If player score is > 21.
    if (this.playerScore > 21) {
      // Set winner.
      this.winner = "Dealer";

      // End round.
      await this.endRound();

      return;
    }

    // If dealer score is 21.
    if (this.dealerScore === 21) {
      // Set winner.
      this.winner = "Dealer";

      // Call dealer stay.
      this.dealerStay();

      // End round.
      await this.endRound();

      return;
    }

    // If player score is 21.
    if (this.playerScore === 21) {
      // Set winner.
      this.winner = "Player";

      // Call player stay.
      this.playerStay();

      // End round.
      await this.endRound();

      return;
    }

    // If not dealer stays.
    if (!this.dealerStays) {
      return;
    }

    // If dealer score is greater than player score.
    if (this.dealerScore > this.playerScore) {
      // Set winner.
      this.winner = "Dealer";

      // End round.
      await this.endRound();

      return;
    }

    // If player score is greater than player score.
    if (this.playerScore > this.dealerScore) {
      // Set winner.
      this.winner = "Player";

      // End round.
      await this.endRound();

      return;
    }

    // If dealer score is equal to player score.
    if (this.dealerScore === this.playerScore) {
      // Set winner.
      this.winner = "Dealer";

      // End round.
      await this.endRound();

      return;
    }
  };

  /**
   * Removes a card from the deck and adds it to the dealer's hand.
   */
  dealerHit = async () => {
    // If dealer stays, return.
    if (this.dealerStays) return;

    // If dealer score greater than 16.
    if (this.dealerScore > 16) {
      // Call dealer stay.
      await this.dealerStay();

      return;
    }

    // Get the card.
    const card = await this.shoe.pop();

    // Deal the card.
    this.dealerHand.push(card);

    // Score hands.
    await this.scoreHands();

    // Check for winner.
    await this.checkForWinner();
  };

  /**
   * Sets dealer stay.
   */
  dealerStay = async () => {
    // Set dealer stay.
    this.dealerStays = true;
  };

  /**
   * End the game.
   */
  endGame = () => {
    // Set game over.
    this.gameOver = true;
  };

  /**
   * Ends a round.
   */
  endRound = async () => {
    // If not round started, return.
    if (!this.roundStarted) return;

    // Push current hands and winner to rounds.
    this.rounds.push({
      dealerHand: this.dealerHand,
      dealerScore: this.dealerScore,
      dealerStays: this.dealerStays,
      playerHand: this.playerHand,
      playerScore: this.playerScore,
      playerStays: this.playerStays,
      winner: this.winner,
    });

    // Set round started.
    this.roundStarted = false;

    // If dealer is winner.
    if (this.winner === "Dealer") {
      // Mod player bank.
      await this.playerBankMod(-1 * this.playerBet);
    }

    // If player is winner.
    if (this.winner === "Player") {
      // Mod player bank.
      await this.playerBankMod(this.playerBet);
    }
  };

  /**
   * Fills the shoe.
   */
  fillShoe = async () => {
    /**
     * Creates a deck of cards.
     *
     * @returns {array} deck
     */
    const deckOfCards = () => {
      // Define deck.
      const deck = [];

      // Define card suits.
      const cardSuits = ["CLUBS", "DIAMONDS", "HEARTS", "SPADES"];

      // Define card names.
      const cardNames = [
        "Ace",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "Jack",
        "Queen",
        "King",
      ];

      // Loop through suits and names.
      for (const cardSuit of cardSuits) {
        for (const cardName of cardNames) {
          deck.push({
            name: cardName,
            suit: cardSuit,
          });
        }
      }

      const shuffleArray = (arr) => {
        let currentIndex = arr.length,
          randomIndex;

        // While there remain elements to shuffle...
        while (currentIndex !== 0) {
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [arr[currentIndex], arr[randomIndex]] = [
            arr[randomIndex],
            arr[currentIndex],
          ];
        }

        return arr;
      };

      return shuffleArray(deck);
    };

    // Define shoe.
    this.shoe = [
      ...deckOfCards(),
      ...deckOfCards(),
      ...deckOfCards(),
      ...deckOfCards(),
      ...deckOfCards(),
      ...deckOfCards(),
    ];
  };

  /**
   * Gets the dealer's hand.
   */
  getDealerHand = () => {
    // Define hand.
    const hand = this.dealerHand.slice();

    // If not dealer stays.
    if (!this.dealerStays) {
      // Splice array.
      hand.splice(0, 1, { name: false, suit: false });
    }

    return hand;
  };

  /**
   * Gets the player bet.
   *
   * @returns playerBet
   */
  getPlayerBet = () => {
    return this.playerBet;
  };

  /**
   * Gets the player's hand.
   *
   * @returns playerHand
   */
  getPlayerHand = () => {
    return this.playerHand;
  };

  /**
   * Gets the player score.
   *
   * @returns playerScore
   */
  getPlayerScore = () => {
    return this.playerScore;
  };

  /**
   * Adds amount to the player bank.
   *
   * @param {number} amount
   */
  playerBankMod = async (amount) => {
    // Add amount to player bank.
    this.playerBank += amount;
  };

  /**
   * Removes a card from the deck and adds it to the player's hand.
   */
  playerHit = async () => {
    // If not round started, return.
    if (!this.roundStarted) return;

    // If player stays, return.
    if (this.playerStays) return;

    // Get the card.
    const card = await this.shoe.pop();

    // Deal the card.
    this.playerHand.push(card);

    // Score hands.
    await this.scoreHands();

    // Check for winner.
    await this.checkForWinner();
  };

  /**
   * Signals a player is staying and it is now the dealer's turn.
   */
  playerStay = async () => {
    // Set player stays.
    this.playerStays = true;

    // While not winner.
    while (!this.winner) {
      // If not dealer stays.
      if (!this.dealerStays) {
        // Dealer hit.
        await this.dealerHit();
      }

      // Check for winner.
      await this.checkForWinner();
    }
  };

  /** Score hands. */
  scoreHands = async () => {
    // If dealer hand or player hand length is zero, return.
    if (this.dealerHand.length === 0 || this.playerHand.length === 0) return;

    // Define scores.
    const scores = [this.dealerHand, this.playerHand].map((hand) => {
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
    });

    // Set dealer score.
    this.dealerScore = scores[0];

    // Set player score.
    this.playerScore = scores[1];
  };

  /**
   * Sets the player's bet amount.
   *
   * @param {number} amount
   */
  setPlayerBet = (amount) => {
    // If round started, return.
    if (this.roundStarted) return;

    // Set player bet.
    this.playerBet = amount;
  };

  /**
   * Starts a new round.
   */
  startRound = async () => {
    // If player bank is less than player bet.
    if (this.playerBank < this.playerBet) {
      // End game.
      this.endGame();

      return;
    }

    // If round started, return.
    if (this.roundStarted) return;

    // If less than 20 cards in shoe.
    if (this.shoe.length < 20) {
      // Fill shoe.
      await this.fillShoe();
    }

    // Set hands.
    this.dealerHand = [];
    this.playerHand = [];

    // Set scores.
    this.dealerScore = 0;
    this.playerScore = 0;

    // Set stays.
    this.dealerStays = false;
    this.playerStays = false;

    // Set round started.
    this.roundStarted = true;

    // Set winner.
    this.winner = false;

    // Inital deal.
    await this.playerHit();
    await this.dealerHit();
    await this.playerHit();
    await this.dealerHit();

    // Score hands.
    await this.scoreHands();

    // Check for winner.
    await this.checkForWinner();
  };

  test = async () => {
    // Define i.
    let i = 0;

    // While not game over.
    while (!this.gameOver) {
      // Start a round.
      await this.startRound();

      // While not winner.
      while (!this.winner) {
        // If player score greater than 17.
        if (this.playerScore > 17) {
          // Call player stay.
          await this.playerStay();
        } else {
          //Call player hit.
          await this.playerHit();
        }
      }

      if (this.playerScore > 21 && this.dealerScore > 21) {
        console.log(this.rounds.slice(-1));
      }

      // Increment i.
      i++;

      // If i equals 5000.
      if (i >= 5000) {
        break;
      }
    }

    // Log object.
    console.log(this);
  };
}
