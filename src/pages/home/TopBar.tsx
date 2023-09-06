import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../App";
import { useContext } from "react";
import { colors } from "../../global/colors";
import { InputAdornment, TextField } from "@mui/material";
import { Menu, SearchRounded } from "@mui/icons-material";
import { Query } from ".";

interface TopBarProps {
  user: { uid: string; email: string };
  query: Query;
  onChangeQuery: (query: Query) => void;
  onDrawerToggle: () => void;
}

const TopBar = ({
  user,
  onDrawerToggle,
  query,
  onChangeQuery,
}: TopBarProps) => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const isLoged = !!(user.uid && user.email);

  function login() {
    navigate("/auth/login");
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

  const onChangeTxt = (txt: string) => {
    let nextQuery = { ...query };
    nextQuery.filters.searchStr = txt;

    onChangeQuery(nextQuery);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#1A1A1A",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          borderBottomRightRadius: 8,
          borderBottomLeftRadius: 8,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <Menu />
          </IconButton>

          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchRounded sx={{ color: "#edecec" }} />
                </InputAdornment>
              ),
            }}
            style={{
              minWidth: 200,
              maxWidth: 500,
              width: 300,
              backgroundColor: colors.lightCard,
              borderRadius: 20,
              borderWidth: 0,
            }}
            sx={{
              "& fieldset": { border: "none" },
              input: { color: "white" },
            }}
            onInput={(e: any) => onChangeTxt(e.target.value)}
            variant="outlined"
            placeholder="Pesquisar..."
            size="medium"
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />

          <div style={{ padding: 4 }}>
            {isLoged ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: 100,
                }}
              >
                <Button
                  onClick={() => logout()}
                  startIcon={<LogoutIcon></LogoutIcon>}
                  sx={{
                    textTransform: "none",
                    fontSize: 14,
                    padding:0,
                    textAlign: "center",
                  }}
                  color="inherit"
                >
                  Sair
                </Button>
                <Typography
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    maxWidth: "150px", 
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  fontSize={12}
                >
                  {user.email}
                </Typography>
              </div>
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
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;
