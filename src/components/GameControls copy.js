import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const GameControls = ({
  startRound,
  playerHit,
  playerStay,
  playerStaying,
  roundStarted,
  winner,
}) => {
  // Define player can change bet.
  const playerCanChangeBet = () => {
    // If winner, return true.
    if (winner) return true;

    // If not round started, return true.
    if (!roundStarted) return true;

    return false;
  };

  // Define player can hit.
  const playerCanHit = () => {
    // If not round started, return false.
    if (!roundStarted) return false;

    // If player staying, return false.
    if (playerStaying) return false;

    // If winner, return false.
    if (winner) return false;

    return true;
  };

  // Define player can stay.
  const playerCanStay = () => {
    // If not round started, return false.
    if (!roundStarted) return false;

    // If player staying, return false.
    if (playerStaying) return false;

    // If winner, return false.
    if (winner) return false;

    return true;
  };

  // Define player can start round.
  const playerCanStartRound = () => {
    // If winner, return false.
    if (winner) return true;

    // If round started, return false.
    if (roundStarted) return false;

    return true;
  };

  return (
    <div className="GameControls">
      <PlayControls
        playerCanChangeBet={playerCanChangeBet}
        playerHit={playerHit}
        playerStay={playerStay}
        startRound={startRound}
      />
      <BetControls
        playerCanChangeBet={playerCanChangeBet}
        playerHit={playerHit}
        playerStay={playerStay}
        startRound={startRound}
      />
    </div>
  );
};

const PlayControls = ({
  playerCanChangeBet,
  playerHit,
  playerStay,
  startRound,
}) => {
  return (
    <div className="PlayControls">
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <Button
                  className="OneDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={startRound}
                >
                  <span>
                    <span>1</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="FiveDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={playerHit}
                >
                  <span>
                    <span>5</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="TenDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={playerStay}
                >
                  <span>
                    <span>10</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="TwentyFiveDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={playerStay}
                >
                  <span>
                    <span>25</span>
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const BetControls = ({
  playerCanChangeBet,
  playerHit,
  playerStay,
  startRound,
}) => {
  return (
    <div className="BetControls">
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <Button
                  className="OneDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={startRound}
                >
                  <span>
                    <span>1</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="FiveDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={playerHit}
                >
                  <span>
                    <span>5</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="TenDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={playerStay}
                >
                  <span>
                    <span>10</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="TwentyFiveDollarBetButton"
                  disabled={!playerCanChangeBet()}
                  onClick={playerStay}
                >
                  <span>
                    <span>25</span>
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GameControls;
