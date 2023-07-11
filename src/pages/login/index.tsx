import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Link,
  Snackbar,
  Typography,
} from "@mui/material";

import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../App";
import CustomTextField from "../../components/CustomTextField";

const LoginPage = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleSubmit = async () => {
    try {
      const response: any = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      authContext.setCurrentUser({
        email: response.user.email,
        uid: response.user.uid,
      });

      navigate("/");
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setAuthError(errorCode + ":" + errorMessage);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={!!authError}
      >
        <Alert severity="error">{authError}</Alert>
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
        <Typography component="h1" variant="h5">
          Entre na sua conta
        </Typography>
        <Box sx={{ mt: 1 }}>
          <CustomTextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomTextField
            onChange={(e) => setPassword(e.target.value)}
            label="Senha"
          />

          <Button
            onClick={() => handleSubmit()}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#27b4a4", color: "white" }}
          >
            Continuar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link fontSize={16} href="/signup" color="#27b4a4">
                {"Não tem uma conta?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
