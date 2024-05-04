import React, { useState } from "react";
import { Typography, Modal, Box } from "@mui/material";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ErrorModalProps {
  msg: string;
  handleClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ msg, handleClose }) => {
  return (
    <Modal
      open={!!msg}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Error
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {msg}
        </Typography>
      </Box>
    </Modal>
  );
};

export default ErrorModal;
