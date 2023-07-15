import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { auth } from "./firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createTheme, ThemeProvider } from "@mui/material";

import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { colors } from "./global/colors";

// o context foi nescessario ate pra deixar mais simples
// o acesso dessas variaveis entre telas
export const AuthContext = createContext({
  currentUser: { email: "", uid: "" },
  setCurrentUser: (user: { email: string; uid: string }) => {},
});

const theme = createTheme({
  components: {
    MuiCircularProgress: {
      defaultProps: {
        sx: {
          color: colors.green,
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: colors.white,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: colors.card,
          "&:focus": {
            outline: "none",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.lightCard,
          color: colors.green,
          height: 20,
          "&::before, &::after": {
            borderColor: colors.darkGreen,
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          button: {
            color: colors.green,
          },
        },
      },
    },
  },
});

function App() {
  const [currentUser, setCurrentUser] = useState({ email: "", uid: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({ email: user?.email || "", uid: user.uid });
      } else {
        setCurrentUser({ email: "", uid: "" });
      }
    });

    return () => unsubscribe(); // funcao cleanup
  }, []);

  return (
    <Router>
      <div>
        <section>
          <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth/login" element={<LoginPage />} />
                <Route path="/auth/signup" element={<SignupPage />} />
              </Routes>
            </ThemeProvider>
          </AuthContext.Provider>
        </section>
      </div>
    </Router>
  );
}

export default App;
