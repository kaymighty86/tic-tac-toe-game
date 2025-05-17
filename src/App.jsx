import "./App.css";

import PlayersSection from "./components/PlayersSection";
import GameBoard from "./components/GameBoard";
import GameManager from "./contexts/GameManager";

function App() {

  return (
    <main>
      <GameManager>
        <section className="main_container">
          <PlayersSection />
          <GameBoard />
        </section>
        --INPUT LOG--
      </GameManager>
    </main>
  )
}

export default App
