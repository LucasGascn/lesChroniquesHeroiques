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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function AdventurePopUp(props) {
  const [checked, setChecked] = React.useState(false);
  const [errorMsg, setErrorMsg] = useState();

  const [errorName, setErrorName] = useState(false);
  const [errorClass, setErrorClass] = useState(false);


  const [name, setName] = useState(null);
  const userId = JSON.parse(localStorage.getItem("user")).user._id;

  const classes = [
    {
        name: "Voleur",
        stats: [
            {
                name: "hp",
                value: 3,
                max: 10 
            },
            {
                name: "str",
                value: 10,
                max: 100
            }
        ]
    },
    {
        name: "Mage",
        stats: [
            {
                name: "hp",
                value: 3,
                max: 10 
            },
            {
                name: "str",
                value: 10,
                max: 100
            }
        ]
    },
    {
        name: "Guerrier",
        stats: [
            {
                name: "hp",
                value: 3,
                max: 10 
            },
            {
                name: "str",
                value: 10,
                max: 100
            }
        ]
    },
    {
        name: "Prêtre",
        stats: [
            {
                name: "hp",
                value: 3,
                max: 10 
            },
            {
                name: "str",
                value: 10,
                max: 100
            }
        ]
    },
]

  const [characterClass, setCharacterClass] = React.useState('');
  const [className, setClassName] = React.useState('');

  const handleChange = (event) => {
    let charClass = classes.filter(element => element.name == event)

    setCharacterClass(charClass[0])
    setClassName(event)
  };

  const submitForm = () => {
    if (name == null || name == "") {
      setErrorName(true);
    } else if (characterClass.name == null || characterClass.name == "") {
      setErrorClass(true);
    } else {

    const character= {
        name: name,
        job: characterClass.name,
        userId: userId,
        adventureId: props.adventureId,
        stats: characterClass.stats,
        inventory: [],
        currency: 0
    }

    axios
    .post("/addPlayer", character)
    .then(response => {
        props.addCharacter(response.data.character);
        props.handleClose();
        console.log(response.data)
    })
    .catch(error => {
        console.log(error)
        setChecked(true);
        setErrorMsg("Complétion incompléte");
    })
    }
  };
  return (
    <div>
      <DialogTitle sx={{ textAlign: "center" }}>
        Créez votre personnage
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nom du personnage"
          fullWidth
          error={errorName}
          onChange={(change) => {
            setErrorName(false);
            setName(change.target.value);
          }}
        />
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Classe</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={className}
                label="Classe"
                onChange={(change) => {
                    setErrorClass(false);
                    handleChange(change.target.value);
                }}
                error={errorClass}
            >
                {
                    classes.map((element) => {
                        return(
                                <MenuItem value={element.name}>{element.name}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>

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
