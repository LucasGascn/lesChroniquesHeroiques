import RoutesProvider from "./routes";
import NavBar from "./pages/shared/nav";
import Background from "./background";
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/muiCustom';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
      <Background></Background>
      <NavBar></NavBar>
      <RoutesProvider></RoutesProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
