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

export default function CharacterInfosPopUp(props) {

    const character = props.character

    const charInventory = () => {
        if(character.inventory.length == 0 ){
            return (
                <div>
                    Votre inventaire est vide
                </div>
            )
        }

        character.inventory.map((item, index) => {
            return(
                <div key={index}>
                    {item.name} : {item.quantity}x
                </div>
            )
        })
    }

  return (
    <div>
      <DialogTitle sx={{ textAlign: "center" }}>
        Fiche de votre personnage
      </DialogTitle>
      <DialogContent>
        <div>
            Nom : {character.name}
        </div>
        <div>
            Classe : {character.job}
        </div>
        <div>
            Stats : {character.stats.map((stat, index) => {
                return(
                    <div key={index}>
                        {stat.name} : {stat.value}/{stat.max}
                    </div>
                )
            })}
        </div>
        <div>
            Inventaire : {charInventory()}
        </div>
        <div>
            Argent : {character.currency}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose}>Fermer</Button>
      </DialogActions>
    </div>
  );
}
