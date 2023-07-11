import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";

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
      const errorCode = error.code;
      const errorMessage = error.message;
      setApiError(errorCode + ":" + errorMessage);
    }
  };

  return (
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
          alignItems: "center",
          backgroundColor: "#222327",
          borderRadius: 4,
          padding: 8,
        }}
      >
        <Typography component="h1" color="white" variant="h5">
          Crie uma Conta
        </Typography>
        <Box sx={{ mt: 1 }}>
          <CustomTextField
            label="email"
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
          />
          <CustomTextField
            label="Senha"
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
          />
          <CustomTextField
            label="Confirme a senhha"
            onChange={(e) => setConfirmationPassword(e.target.value)}
            error=""
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
              <Link fontSize={16} href="/login" color={colors.green}>
                {"Ja tenha uma conta?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignupPage;
