import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Modal,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";

const GameInfo = ({
  dealerScore,
  dealerWinsCount,
  playerBank,
  playerBet,
  playerScore,
  playerWinsCount,
  startRound,
  winner,
}) => {
  return (
    <div className="GameInfo">
      <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">React Blackjack</Navbar.Brand>
          <Navbar.Text>${playerBank}</Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
};

export default GameInfo;
