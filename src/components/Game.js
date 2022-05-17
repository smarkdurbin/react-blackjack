import React, { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import GameControls from "./GameControls";
import GameInfo from "./GameInfo";
import Shoe from "../lib/blackjack/shoe";
import scoreHand from "../lib/blackjack/scoreHand";
import determineWinner from "../lib/blackjack/determineWinner";
import GameModal from "./GameModal";
import { Button, Col, Row } from "react-bootstrap";

const Game = () => {
  // Set up state for game.
  const [dealerHand, setDealerHand] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [dealerStaying, setdealerStaying] = useState(false);
  const [dealerWinsCount, setDealerWinsCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [modalContent, setModalContent] = useState(false);
  const [playerBank, setPlayerBank] = useState(100);
  const [playerBet, setPlayerBet] = useState(10);
  const [playerHand, setPlayerHand] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [playerStaying, setplayerStaying] = useState(false);
  const [playerWinsCount, setPlayerWinsCount] = useState(0);
  const [rounds, setRounds] = useState([]);
  const [roundStarted, setRoundStarted] = useState(false);
  const [shoe, setShoe] = useState([...Shoe()]);
  const [showModal, setShowModal] = useState(false);
  const [winner, setWinner] = useState(false);

  // Changes player bet.
  const changePlayerBet = (amount) => {
    // Set player bet.
    setPlayerBet(amount);
  };

  // Checks for a winner.
  const checkForWinner = () => {
    // Set winner.
    setWinner(
      determineWinner(dealerScore, dealerStaying, playerScore, roundStarted)
    );
  };

  // Removes a card from the shoe.
  const dealCard = () => {
    // Get the card.
    const card = shoe.splice(-1)[0];

    // Set shoe.
    setShoe(shoe);

    return card;
  };

  // Deals a card to the dealer.
  const dealerHit = () => {
    // If not round started, return.
    if (!roundStarted) return;

    // If dealer staying, return.
    if (dealerStaying) return;

    // If dealer score greater than 16 or  player score greater than 21 or dealer score greater than or equal to player score.
    if (
      playerStaying &&
      (dealerScore > 16 || playerScore > 21 || dealerScore >= playerScore)
    ) {
      // Call dealer stay.
      dealerStay();

      return;
    }

    // Get a card.
    const card = dealCard();

    // Push card to hand.
    dealerHand.push(card);

    // Deal the card.
    setDealerHand([...dealerHand]);
  };

  // Dealer stay.
  const dealerStay = () => {
    // Set dealer staying.
    setdealerStaying(true);
  };

  // Ends the game.
  const endGame = () => {
    // Set modal content.
    setModalContent(gameOverModalContent);

    // Set show modal.
    showModal(true);

    // Set shoe.
    setShoe([]);
  };

  // Ends the round.
  const endRound = () => {
    // Push details of round to rounds.
    rounds.push({
      dealerHand,
      dealerScore,
      dealerStaying,
      playerBet,
      playerHand,
      playerScore,
      playerStaying,
    });

    // Set rounds.
    setRounds([...rounds]);

    // Set round started.
    setRoundStarted(false);
  };

  // Deals initial deal.
  const initialDeal = () => {
    playerHit();
    dealerHit();
    playerHit();
    dealerHit();
  };

  // Deals a card to the player.
  const playerHit = async () => {
    // If not round started, return.
    if (!roundStarted) return;

    // If player staying, return.
    if (playerStaying) return;

    // Get a card.
    const card = dealCard();

    // Push card to hand.
    playerHand.push(card);

    // Deal the card.
    setPlayerHand([...playerHand]);
  };

  // Player stay.
  const playerStay = () => {
    // Set player staying.
    setplayerStaying(true);
  };

  // Resets for a new round.
  const resetRound = () => {
    // Reset hands, scores, stays, and winner.
    setDealerHand([]);
    setPlayerHand([]);
    setDealerScore(0);
    setPlayerScore(0);
    setdealerStaying(false);
    setplayerStaying(false);
    setWinner(false);
  };

  // Scores hands.
  const scoreHands = () => {
    // Set scores.
    setDealerScore(scoreHand(dealerHand));
    setPlayerScore(scoreHand(playerHand));
  };

  // Starts a round.
  const startRound = () => {
    // If player bank is less than player bet.
    if (playerBank < playerBet) setPlayerBet(playerBank);

    // If player bank is zero, end game.
    if (playerBank === 0) setGameOver(true);

    // If round started.
    if (roundStarted && !winner) return;

    // If less than 20 cards in the shoe.
    if (shoe.length < 20) setShoe([...Shoe()]);

    // Reset round.
    resetRound();

    // Set round started.
    setRoundStarted(true);

    // Set show modal.
    setShowModal(false);
  };

  // Hook on round started.
  useEffect(() => {
    if (roundStarted) {
      // Initial deal.
      initialDeal();
    }
  }, [roundStarted]);

  // Hook on dealer hand.
  useEffect(() => {
    // If player staying and not dealer staying.
    if (playerStaying && !dealerStaying) {
      // Call dealer hit.
      dealerHit();
    }

    // Score hands.
    scoreHands();
  }, [dealerHand]);

  // Hook on player hand.
  useEffect(() => {
    // Score hands.
    scoreHands();
  }, [playerHand]);

  // Hook on dealer score.
  useEffect(() => {
    // Check for winner.
    checkForWinner();
  }, [dealerScore]);

  // Hook on  player score.
  useEffect(() => {
    // Call check for winner.
    checkForWinner();
  }, [playerScore]);

  // Hook on player staying.
  useEffect(() => {
    // If player staying.
    if (playerStaying) {
      // Call dealer hit.
      dealerHit();
    }
  }, [playerStaying]);

  // Hook on dealer staying.
  useEffect(() => {
    // If dealer staying.
    if (dealerStaying) {
      // Call check for winner.
      checkForWinner();
    }
  }, [dealerStaying]);

  // Hook on winner.
  useEffect(() => {
    // if winner.
    if (winner) {
      // Call end round.
      endRound();

      // If winner equals Dealer.
      if (winner === "Dealer") {
        // Set wins count.
        setDealerWinsCount(dealerWinsCount + 1);

        // Set player bank.
        setPlayerBank(playerBank - playerBet);

        // Set modal content.
        setModalContent(dealerWinsModalContent);
      }

      // If winner equals Player.
      if (winner === "Player") {
        // Set wins count.
        setPlayerWinsCount(playerWinsCount + 1);

        // Set player bank.
        setPlayerBank(playerBank + playerBet);

        // Set modal content.
        setModalContent(playerWinsModalContent);
      }

      // Set timeout.
      setTimeout(() => {
        // Set show modal.
        setShowModal(true);
      }, 900);
    }
  }, [winner]);

  // Hook on game over.
  useEffect(() => {
    // If game over.
    if (gameOver) {
      // Call end game.
      endGame();
    }
  }, [gameOver]);

  // Define player wins modal content.
  const playerWinsModalContent = (
    <div className="text-center">
      <span
        className="h1 mb-4 d-block"
        dangerouslySetInnerHTML={{ __html: "&#128077;" }}
      />
      <h1 className="mb-5">
        <span className="font-script text-warning">You won this round!</span>
      </h1>
      <RoundScores dealerScore={dealerScore} playerScore={playerScore} />
      <p className="mt-5">
        <Button
          className="PlayAgainButton"
          onClick={() => {
            setShowModal(false);
            startRound();
          }}
        >
          <span>Play Again</span>
        </Button>
      </p>
    </div>
  );

  // Define dealer wins modal content.
  const dealerWinsModalContent = (
    <div className="text-center">
      <span
        className="h1 mb-4 d-block"
        dangerouslySetInnerHTML={{ __html: "&#x1F44E;" }}
      />
      <h1 className="mb-5">
        <span className="font-script text-warning">
          You lost this round&hellip;
        </span>
      </h1>
      <RoundScores dealerScore={dealerScore} playerScore={playerScore} />
      <p className="mt-5">
        <Button
          className="PlayAgainButton"
          onClick={() => {
            setShowModal(false);
            startRound();
          }}
        >
          <span>Play Again</span>
        </Button>
      </p>
    </div>
  );

  // Define default modal content.
  const defaultModalContent = (
    <div className="text-center">
      <h1 className="mb-4">
        <span className="font-script text-warning">React Blackjack</span>
      </h1>
      <h2 className="mb-3 h5 font-block text-uppercase">How to play</h2>
      <p className="mb-5 lh-lg">
        Press <span className="text-uppercase fw-bold text-warning">play</span>{" "}
        to start a new round.
        <br />
        Press <span className="text-uppercase fw-bold text-warning">
          hit
        </span>{" "}
        to receive another card.
        <br />
        Press <span className="text-uppercase fw-bold text-warning">
          stay
        </span>{" "}
        to keep your hand.
        <br />
        Press a{" "}
        <span className="text-uppercase fw-bold text-warning">chip</span> to
        change your bet.
      </p>
      <p>
        <Button
          className="PlayAgainButton"
          onClick={() => {
            setShowModal(false);
            startRound();
          }}
        >
          <span>Let's Play</span>
        </Button>
      </p>
    </div>
  );

  // Define game over modal content.
  const gameOverModalContent = (
    <div className="text-center">
      <h1 className="mb-4">
        <span className="font-script text-warning">Game Over</span>
      </h1>
      <p className="mb-5 lh-lg">
        You're out of money. Refresh the page to start over.
      </p>
      <p>
        <Button
          className="PlayAgainButton"
          onClick={() => {
            setShowModal(false);
            startRound();
          }}
        >
          <span>Let's Play</span>
        </Button>
      </p>
    </div>
  );

  // Hook on component mount.
  useEffect(() => {
    // Set show modal.
    setShowModal(true);
  }, []);

  return (
    <div className="Game">
      <GameInfo
        dealerScore={dealerScore}
        dealerWinsCount={dealerWinsCount}
        playerBank={playerBank}
        playerBet={playerBet}
        playerScore={playerScore}
        playerWinsCount={playerWinsCount}
        roundStarted={roundStarted}
        startRound={startRound}
        winner={winner}
      />
      <GameBoard
        dealerHand={dealerHand}
        playerBet={playerBet}
        playerHand={playerHand}
        roundStarted={roundStarted}
        startRound={startRound}
        winner={winner}
      />
      <GameControls
        changePlayerBet={changePlayerBet}
        gameOver={gameOver}
        playerHit={playerHit}
        playerStay={playerStay}
        playerStaying={playerStaying}
        roundStarted={roundStarted}
        startRound={startRound}
        winner={winner}
      />
      <GameModal
        content={modalContent}
        defaultContent={defaultModalContent}
        show={showModal}
      />
    </div>
  );
};

const RoundScores = ({ dealerScore, playerScore }) => {
  return (
    <div className="RoundScores">
      <Row>
        <Col className="text-center" xs={6}>
          <h2 className="text-uppercase font-block">Dealer</h2>
          <p className="mb-0">{dealerScore}</p>
        </Col>
        <Col className="text-center" xs={6}>
          <h2 className="text-uppercase font-block">Player</h2>
          <p className="mb-0">{playerScore}</p>
        </Col>
      </Row>
    </div>
  );
};

export default Game;
