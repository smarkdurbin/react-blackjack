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
  // Define show info modal.
  const [showInfoModal, setShowInfoModal] = useState(false);

  // Define modal content.
  const [modalContent, setModalContent] = useState({
    title: "Round ended",
    body: "",
    button: {
      text: "Play Again",
      action: startRound,
    },
  });

  // Define handlers for closing and showing the info modal.
  const handleInfoModalClose = () => setShowInfoModal(false);
  const handleInfoModalShow = () => setShowInfoModal(true);

  // Hook on winner.
  useEffect(() => {
    if (winner) {
      // Set info modal content.
      setModalContent((prevState) => ({
        ...prevState,
        body: (
          <div className="d-flex flex-column h-100 text-center align-content-center justify-content-center">
            <div>
              <h2 className="fw-bold text-uppercase display-3 mb-5">
                {winner === "Player" && <span>You won!</span>}
                {winner === "Dealer" && <span>Dealer won</span>}
              </h2>
            </div>
            <div>
              <Button
                variant="success"
                className="PlayAgainButton"
                onClick={() => {
                  handleInfoModalClose();
                  modalContent.button.action();
                }}
              >
                <span>{modalContent.button.text}</span>
              </Button>
            </div>
          </div>
        ),
      }));

      // Call handle info modal show.
      handleInfoModalShow();
    }
  }, [winner]);

  return (
    <div className="GameInfo">
      <GameInfoModal
        show={showInfoModal}
        closeModal={handleInfoModalClose}
        modalContent={modalContent}
      />
      <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand href="/">Blackjack</Navbar.Brand>
          <Navbar.Text>${playerBank}</Navbar.Text>
        </Container>
      </Navbar>
    </div>
  );
};

const GameInfoModal = ({ show, closeModal, modalContent }) => {
  return (
    <div className="GameInfoModal">
      <Modal show={show} onHide={closeModal} fullscreen="sm-down">
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="pb-5">{modalContent.body}</Modal.Body>
        <Modal.Footer className="border-0"></Modal.Footer>
      </Modal>
    </div>
  );
};

export default GameInfo;
