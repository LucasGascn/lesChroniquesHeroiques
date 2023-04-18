import RoutesProvider from "./routes";
import NavBar from "./pages/shared/nav";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <RoutesProvider></RoutesProvider>
    </div>
  );
}

export default App;
