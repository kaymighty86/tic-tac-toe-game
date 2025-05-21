import "./App.css";

import PlayersSection from "./components/PlayersSection";
import GameBoard from "./components/GameBoard";
import GameManager from "./contexts/GameManager";
import InputLog from "./components/InputLog";

function App() {

  return (
    <main>
      <GameManager>
        <section className="main_container">
          <PlayersSection />
          <GameBoard />
        </section>
        <section>
          <InputLog />
        </section>
      </GameManager>
    </main>
  )
}

export default App
