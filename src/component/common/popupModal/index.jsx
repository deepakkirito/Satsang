import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { foregroundColor, textColor } from "@/component/assets/css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: foregroundColor,
  boxShadow: 24,
  width: "85vw",
  padding: "1rem",
  borderRadius: "0.5rem",
  p: {
    color: textColor,
    fontSize: "12px",
  }
};

export default function PopupModal({ title, content, children, openModal, handleOpenModal }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    openModal && setOpen(openModal);
  }, [openModal]);

  handleOpenModal(open)

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {content}
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
}
