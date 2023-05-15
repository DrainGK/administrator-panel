import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Setting from "./pages/settings/Setting";
import Single from "./pages/singlepost/Single";
import Write from "./pages/write/Write";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const { user } = useContext(Context);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#013e87",
      },
      secondary: {
        main: "#2e74c9",
      },
    },
    typography: {
      h1: {
        fontSize: "2.5rem",
        fontWeight: "600",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: "600",
      },
      h3: {
        fontSize: "1.5rem",
        fontWeight: "600",
      },
    },
  });

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <TopBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write" element={user ? <Write /> : <Login />} />
            <Route path="/post/:id" element={<Single />} />
            <Route
              path="/setting"
              element={user ? <Setting /> : <Register />}
            />
            <Route path="/login" element={user ? <Home /> : <Login />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
