import "./App.css";

import EditableText from "./components/EditableText";

function App() {

  return (
    <main>
      <section className="main_container">
        <EditableText defaultValue="Player 1" />
        <EditableText defaultValue="Player 2" />
      </section>
      --INPUT LOG--
    </main>
  )
}

export default App
