import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

const GameModal = ({ content, defaultContent, show }) => {
  // Define show modal.
  const [showModal, setShowModal] = useState(false);

  // Define modal content.
  const [modalContent, setModalContent] = useState(<></>);

  // Hook on show.
  useEffect(() => {
    // Set show.
    setShowModal(show);
  }, [show]);

  // Hook on content.
  useEffect(() => {
    // If content.
    if (content) {
      // Set content.
      setModalContent(content);
    } else {
      // Set content.
      setModalContent(defaultContent);
    }
  }, [content]);

  // Define handler for closing the modal.
  const handleModalClose = () => setShowModal(false);

  return (
    <div className="GameModal">
      <Modal show={showModal} onHide={handleModalClose} fullscreen="sm-down">
        <Modal.Header closeButton className="border-0"></Modal.Header>
        <Modal.Body className="pb-5 px-4">{modalContent}</Modal.Body>
        <Modal.Footer className="border-0"></Modal.Footer>
      </Modal>
    </div>
  );
};

export default GameModal;
