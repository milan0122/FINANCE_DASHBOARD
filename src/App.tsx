import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { CssBaseline ,ThemeProvider} from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ padding: "1rem 2rem 4rem 2rem" }}>
            <Routes>
              <Route path="/" element={<h1>Dashboard Page</h1>} />
              <Route path="/predictions" element={<h1>Prediction Page</h1>} />
            </Routes>
          </div>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

// // App.tsx
// const App = () => {
//   return <div>Hello, React!</div>;
// };

// export default App;

