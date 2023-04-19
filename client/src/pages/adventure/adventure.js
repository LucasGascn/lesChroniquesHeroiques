import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

const theme = createTheme();

export default function Adventure() {
  let adventure;
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const id = JSON.parse(localStorage.getItem("user")).user._id;
    console.log(id);
    axios
      .post("/addAdventure", {
        name: data.get("name"),
        description: data.get("desc"),
        gameMaster: id,
        size: 3,
        players: [],
        quests: [],
        pnj: [],
        classes: [],
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAdventures = async () => {
    await axios.get("/getAdventures");
  };

  const getAdventure = async (id) => {
    await axios.get(`/getAdventure/${id}`).then((response) => {
      console.log(response.data);
      adventure = response.data;
      adventure.name = "tuer toute la ligné de benoit";
      updateAdventure(adventure);
    });
  };

  const updateAdventure = async (adventure) => {
    await axios.post(`/updateAdventure/${adventure._id}`, {
      adventure: adventure,
    });
  };
  getAdventures();
  getAdventure("643fdfcff465b494eee88ea9");
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
    </ThemeProvider>
  );
}
