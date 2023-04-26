import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState, useRef } from "react";
import axios from "axios";
import { Alert, Collapse } from "@mui/material";

export default function AdventurePopUp(props) {
  const [checked, setChecked] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const [errorName, setErrorName] = useState(false);
  const [errorDesc, setErrorDesc] = useState(false);
  const [errorSize, setErrorSize] = useState(false);

  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);
  const [size, setSize] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user")).user._id;

  const submitForm = () => {
    if (name == null || name == "") {
      setErrorName(true);
    } else if (desc == null || desc == "") {
      setErrorDesc(true);
    } else if (size == null || size == "") {
      setErrorSize(true);
    } else {
      const adventure = {
        name: name,
        description: desc,
        gameMaster: userId,
        size: size,
        players: [],
        quests: [],
        pnj: [],
        classes: [],
        activPlayer: [],
      };
      axios
        .post("/addAdventure", { adventure: adventure })
        .then((response) => {
          props.addAdventure(response.data.adv);
          props.handleClose();
        })
        .catch((error) => {
          console.log(error);
          setChecked(true);
          setErrorMsg(
            "Le champ 'Nombre maximum de joueur' doit être un chiffre"
          );
          setInterval(() => {
            setChecked(false);
          }, 3000);
        });
    }
  };
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
          error={errorName}
          onChange={(change) => {
            setErrorName(false);
            setName(change.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="name"
          label="Déscription de l'aventure"
          multiline
          fullWidth
          rows={4}
          error={errorDesc}
          onChange={(change) => {
            setErrorDesc(false);
            setDesc(change.target.value);
          }}
        />
        <TextField
          margin="dense"
          id="name"
          label="Nombre maximum de joueur"
          fullWidth
          type="number"
          error={errorSize}
          onChange={(change) => {
            setErrorSize(false);
            setSize(change.target.value);
          }}
        />
        <Collapse orientation="vertical" in={checked}>
          <Alert
            severity="warning"
            onClose={() => {
              setChecked(false);
            }}
          >
            {errorMsg}
          </Alert>
        </Collapse>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Annuler</Button>
        <Button
          onClick={() => {
            submitForm();
          }}
        >
          Créer
        </Button>
      </DialogActions>
    </div>
  );
}
