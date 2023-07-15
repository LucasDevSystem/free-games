import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

import CustomTextField from "../../components/CustomTextField";
import { auth } from "../../firebase/firebase";
import { colors } from "../../global/colors";

const SignupPage = () => {
  // bastante useState :( talvez hookform seria ideal para um form maior
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimationPassword, setConfirmationPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  // valida o email
  function isEmailValid(email: string) {
    const regex_expr =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(regex_expr)) {
      return true;
    }

    return false;
  }

  // valida a senha
  function isPasswordValid(password: string) {
    if (password.length >= 6) {
      return true;
    }

    return false;
  }

  const handleSubmit = async () => {
    try {
      setEmailError("");
      setPasswordError("");

      if (!isEmailValid(email)) {
        setEmailError("Email inválido");
        return;
      }

      if (!isPasswordValid(password)) {
        setPasswordError("A senha deve ter pelo menos 6 caracteres");
        return;
      }
      if (password !== confimationPassword) {
        setPasswordError("A senha nao corresponde");
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password);

      navigate("/login");
    } catch (error: any) {
      // algum erro inesperado notifica usuario :)
      if (error.code === "auth/email-already-in-use") {
        setApiError(
          "Este Email Ja esta em uso, tente outro."
        );
        setEmailError("email em uso")
      } else {
        setApiError(
          "Oops! Algo deu errado 😢. Por favor, verifique as informações."
        );
      }
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)`,
      }}
    >
      <Container maxWidth="xs">
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={!!apiError}
        >
          <Alert severity="error">{apiError}</Alert>
        </Snackbar>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#222327",
            borderRadius: 4,
          }}
        >
          <Box sx={{ position: "relative", padding: 1 }}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBack
                sx={{ color: colors.green, width: 28, height: 28 }}
              ></ArrowBack>
            </IconButton>
          </Box>
          <Typography sx={{ textAlign: "center" }} component="h1" variant="h5">
            Crie uma Conta
          </Typography>
          <Box
            sx={{
              mt: 1,
              alignItems: "center",
              paddingLeft: 6,
              paddingRight: 6,
              paddingBottom: 6,
              paddingTop: 1,
            }}
          >
            <CustomTextField
              label="email"
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              type={"email"}
            />
            <CustomTextField
              label="Senha"
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              type="password"
            />
            <CustomTextField
              label="Confirme a senhha"
              onChange={(e) => setConfirmationPassword(e.target.value)}
              error=""
              type="password"
            />
            <Button
              onClick={() => handleSubmit()}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: colors.green, color: colors.white }}
            >
              Continuar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  fontSize={16}
                  onClick={() => navigate("/auth/login")}
                  color={colors.green}
                >
                  {"Ja tenha uma conta?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default SignupPage;
