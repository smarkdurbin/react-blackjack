import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

const GameControls = ({
  changePlayerBet,
  gameOver,
  startRound,
  playerHit,
  playerStay,
  playerStaying,
  roundStarted,
  winner,
}) => {
  // Define player can change bet.
  const playerCanChangeBet = () => {
    // If winner,` return true.
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
    // If game over, return false.
    if(gameOver) return false;

    // If winner, return true.
    if (winner) return true;

    // If round started, return false.
    if (roundStarted) return false;

    return true;
  };

  return (
    <div className="GameControls">
      <PlayControls
        playerCanHit={playerCanHit}
        playerCanStartRound={playerCanStartRound}
        playerCanStay={playerCanStay}
        playerHit={playerHit}
        playerStay={playerStay}
        startRound={startRound}
      />
      <BetControls
        changePlayerBet={changePlayerBet}
        playerCanChangeBet={playerCanChangeBet}
        playerHit={playerHit}
        playerStay={playerStay}
        startRound={startRound}
      />
    </div>
  );
};

const PlayControls = ({
  playerCanHit,
  playerCanStartRound,
  playerCanStay,
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
                  className="StartRoundButton"
                  disabled={!playerCanStartRound()}
                  onClick={startRound}
                >
                  <span>Play</span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="PlayerHitButton"
                  disabled={!playerCanHit()}
                  onClick={playerHit}
                >
                  <span>Hit</span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="PlayerStayButton"
                  disabled={!playerCanStay()}
                  onClick={playerStay}
                >
                  <span>Stay</span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const BetControls = ({ playerCanChangeBet, changePlayerBet }) => {
  // Define active bet button.
  const [activeBetButton, setActiveBetButton] = useState();

  // Define handle player bet change request.
  const handlePlayerBetChangeRequest = (amount, buttonClass) => {
    // If player can change bet.
    if (playerCanChangeBet()) {
      // Set player bet.
      changePlayerBet(amount);

      // Set active bet button.
      setActiveBetButton(buttonClass);
    }
  };

  // Define is active bet button.
  const isActiveBetButton = (className) => {
    // If class name equals active bet button.
    if (activeBetButton === className) return true;

    return false;
  };

  // Hook on component mount.
  useEffect(() => {
    // Set active bet button.
    setActiveBetButton("TenDollarBetButton");
  }, []);

  // Hook on active bet button.
  useEffect(() => {}, [activeBetButton]);

  return (
    <div className="BetControls">
      <Container>
        <Row>
          <Col>
            <Row>
              <Col>
                <Button
                  className="OneDollarBetButton"
                  data-inactive={
                    !isActiveBetButton("OneDollarBetButton") ? "true" : "false"
                  }
                  onClick={() =>
                    handlePlayerBetChangeRequest(1, "OneDollarBetButton")
                  }
                >
                  <span>
                    <span>1</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="FiveDollarBetButton"
                  data-inactive={
                    !isActiveBetButton("FiveDollarBetButton") ? "true" : "false"
                  }
                  onClick={() =>
                    handlePlayerBetChangeRequest(5, "FiveDollarBetButton")
                  }
                >
                  <span>
                    <span>5</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="TenDollarBetButton"
                  data-inactive={
                    !isActiveBetButton("TenDollarBetButton") ? "true" : "false"
                  }
                  onClick={() =>
                    handlePlayerBetChangeRequest(10, "TenDollarBetButton")
                  }
                >
                  <span>
                    <span>10</span>
                  </span>
                </Button>
              </Col>
              <Col>
                <Button
                  className="TwentyFiveDollarBetButton"
                  data-inactive={
                    !isActiveBetButton("TwentyFiveDollarBetButton")
                      ? "true"
                      : "false"
                  }
                  onClick={() =>
                    handlePlayerBetChangeRequest(
                      25,
                      "TwentyFiveDollarBetButton"
                    )
                  }
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
