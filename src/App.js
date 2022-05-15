import Game from "./components/Game";
import Blackjack from "./lib/Blackjack";
import "./App.scss";

function App() {
  const game = new Blackjack();

  return (
    <div className="App">
      <Game game={game} />
    </div>
  );
}

export default App;
