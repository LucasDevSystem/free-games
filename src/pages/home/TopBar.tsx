import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import VideogameAssetIcon from "@mui/icons-material/VideogameAsset";
import LogoutIcon from "@mui/icons-material/Logout";
import GitHubIcon from "@mui/icons-material/GitHub";

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../App";
import { useContext } from "react";

interface TopBarProps {
  user: { uid: string; email: string };
}

const TopBar = ({ user }: TopBarProps) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoged = !!(user.uid && user.email);

  function login() {
    navigate("/login");
  }

  function logout() {
    auth
      .signOut()
      .then(() => {
        authContext.setCurrentUser({
          email: "",
          uid: "",
        });
      })
      .catch((error) => {
        console.log("erro");
      });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: "#313238" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <VideogameAssetIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            href="https://github.com/LucasDevSystem"
            sx={{ mr: 2 }}
          >
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          {isLoged ? (
            <Button
              onClick={() => logout()}
              startIcon={<LogoutIcon></LogoutIcon>}
              sx={{ textTransform: "none", fontSize: 16 }}
              color="inherit"
            >
              {user.email}
            </Button>
          ) : (
            <Button
              onClick={() => login()}
              startIcon={<LoginIcon></LoginIcon>}
              sx={{ textTransform: "none", fontSize: 16 }}
              color="inherit"
            >
              Entrar
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
