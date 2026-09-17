import Meal from "./Meals";

function App() {
  return (
    <main className="app">
      <header className="hero">
        <span className="eyebrow">Fresh from the coast</span>
        <h1>
          Seafood made
          <br />
          beautifully simple.
        </h1>
        <p>Discover fresh and delicious recipes from around the world.</p>
      </header>
      <Meal />
    </main>
  );
}

export default App;
