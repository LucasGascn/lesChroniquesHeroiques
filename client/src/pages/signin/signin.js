import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, Collapse } from "@mui/material";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState();
  const [checked, setChecked] = React.useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    axios
      .post("/auth", {
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "error") {
          setErrorMsg(response.data.error);
          setChecked(true);
        }
        if (response.status === 201) {
          localStorage.setItem(
            "user",
            JSON.stringify(jwt_decode(response.data.token))
          );
          navigate("/home", { replace: true });
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg(error.response.data.message);
        setChecked(true);
      });
  };

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
            Se connecter
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse mail"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Grid item>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#f2e7bf",
                color: "black",
                "&:hover": {
                  backgroundColor: "#e4ce7c",
                },
              }}
            >
              Se connecter
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Mot de passe
                </Link>
              </Grid> */}
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Pas encore de compte? Inscrivez vous"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
