import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import getCardHtmlEntity from "../lib/blackjack/getCardHtmlEntity";

const GameBoard = ({
  dealerHand,
  playerHand,
  winner,
}) => {
  return (
    <div className="GameBoard">
      <Container>
        <Row>
          <Col>
            <Hand cards={dealerHand} dealer={true} winner={winner} />
          </Col>
          <Col>
            <Hand cards={playerHand} winner={winner} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Hand = ({ cards, dealer = false, winner }) => {
  return (
    <div className="Hand">
      <Row data-cards={cards.length}>
        {cards.map(({ name, suit }, index) => {
          if (index === 0 && dealer && !winner) {
            return (
              <Col key={index}>
                <Card name={"NONE"} suit={"NONE"} />
              </Col>
            );
          } else {
            return (
              <Col key={index}>
                <Card name={name} suit={suit} />
              </Col>
            );
          }
        })}
      </Row>
    </div>
  );
};

const Card = ({ name, suit }) => {
  // Define card html entity.
  const cardHtmlEntity = getCardHtmlEntity(name, suit);

  return (
    <div data-suit={suit} className="Card">
      <span dangerouslySetInnerHTML={{ __html: cardHtmlEntity }}></span>
    </div>
  );
};

export default GameBoard;
