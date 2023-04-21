import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import io from "socket.io-client";

const theme = createTheme();

export default function Adventure() {
  const [adventures, setAdventure] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).user._id;
  const socket = io.connect("http://localhost:5000/game", {
    query: {
      userId,
    },
  });

  const createAdventure = (name, description, gameMaster, size) => {
    socket.emit("createRoom", name, description, gameMaster, size);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createAdventure(data.get("name"), data.get("desc"), userId, 3);
  };
  const joinAdventure = async (adventureId) => {
    socket.emit("joinRoom", adventureId, userId);
  };
  const getAdventures = async () => {
    await axios.get("/getAdventures").then((response) => {
      setAdventure(response.data);
    });
  };

  let list = adventures.map((adventure) => {
    return (
      <>
        <Button
          key={adventure._id}
          onClick={() => {
            joinAdventure(adventure._id);
          }}
        >
          {adventure.name}
        </Button>
      </>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Aventure
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nom de l'aventure"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="desc"
                  label="Description"
                  name="desc"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              créer une aventure
            </Button>
          </Box>
        </Box>
      </Container>
      <Button onClick={getAdventures}>get adventures</Button>
      {list}
    </ThemeProvider>
  );
}
