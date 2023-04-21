import RoutesProvider from "./routes";
import NavBar from "./pages/shared/nav";
import Background from "./background";

function App() {
  return (
    <div className="App">
      <Background></Background>
      <NavBar></NavBar>
      <RoutesProvider></RoutesProvider>
    </div>
  );
}

export default App;
