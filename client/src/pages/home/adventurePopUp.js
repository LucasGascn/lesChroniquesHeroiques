import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AdventurePopUp(props) {
  return (
    <div>
      <DialogTitle sx={{ textAlign: "center" }}>
        Créer votre aventure
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom de l'aventure"
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Déscription de l'aventure"
          multiline
          fullWidth
          rows={4}
        />
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre maximum de joueur"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Annuler</Button>
        <Button onClick={props.handleClose}>Créer</Button>
      </DialogActions>
    </div>
  );
}
