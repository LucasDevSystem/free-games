import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
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

import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../App";
import CustomTextField from "../../components/CustomTextField";
import { ArrowBack } from "@mui/icons-material";
import { colors } from "../../global/colors";

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
      setAuthError(
        "Oops! Algo deu errado 😢. Por favor, verifique as informações."
      );
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
          open={!!authError}
        >
          <Alert severity="error">{authError}</Alert>
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
            Entre na sua conta
          </Typography>
          <Box
            sx={{
              mt: 1,
              alignItems: "center",
              paddingLeft: 6,
              paddingRight: 6,
              paddingBottom: 6,
              paddingTop:1
            }}
          >
            <CustomTextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
            <CustomTextField
              onChange={(e) => setPassword(e.target.value)}
              label="Senha"
              type="password"
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
                <Link
                  fontSize={16}
                  onClick={() => navigate("/auth/signup")}
                  color="#27b4a4"
                >
                  {"Não tem uma conta?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default LoginPage;
