import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { Box,CssBaseline ,ThemeProvider} from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";
import Navbar from "@/scenes/navbar";
import Dashboard from "@/scenes/dashboard";
import Predictions from "@/scenes/predictions";
function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar/>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/predictions" element={<Predictions/>} />
            </Routes>
            </Box>
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

