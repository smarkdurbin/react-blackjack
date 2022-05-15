import Shoe from "./shoe";

const initialGameState = {
  dealerHand: [],
  dealerScore: 0,
  dealerStays: false,
  gameOver: false,
  playerBank: 100,
  playerBet: 10,
  playerHand: [],
  playerScore: 0,
  playerStays: false,
  roundStarted: false,
  shoe: [...Shoe()],
  winner: [],
};

export default initialGameState;
