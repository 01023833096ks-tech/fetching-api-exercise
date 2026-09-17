import MealCard from "./MealCard";
import { useState, useEffect } from "react";

function Meal() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const url =
    submittedQuery === ""
      ? "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
      : `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(submittedQuery)}`;

  const [state, setState] = useState({
    loading: false,
    data: [],
    error: null,
  });

  async function fetchMeals() {
    setState({ loading: true, data: [], error: null });
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch meals");
      }

      const data = await response.json();
      const meals = data.meals ?? [];
      const results = meals.filter((meal) =>
        meal.strMeal.toLowerCase().includes(submittedQuery.toLocaleLowerCase()),
      );

      setState({
        loading: false,
        data: results,
        error: null,
      });
    } catch (error) {
      setState({
        loading: false,
        data: [],
        error: error.message,
      });
    }
  }

  useEffect(() => {
    fetchMeals();
  }, [submittedQuery]);

  if (state.loading) return <p className="status">Loading recipes...</p>;
  if (state.error) {
    return (
      <div>
        <p className="status error">Error: {state.error}</p>
        <button onClick={fetchMeals}>Retry</button>
      </div>
    );
  }

  const handleSearchQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSubmittedQuery(query.trim().toLowerCase());
  };

  return (
    <>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="search"
          value={query}
          placeholder="Search any recipe"
          onChange={handleSearchQuery}
          aria-label="Search seafood recipes"
        />
        <button type="submit">Search</button>
      </form>
      {state.data.length === 0 ? (
        <p className="status">No recipes found.</p>
      ) : null}
      <section className="recipes">
        <div className="section-title">
          <div>
            <span className="eyebrow">Browse the menu</span>
            <h2>{submittedQuery ? "Search results" : "Seafood favourites"}</h2>
          </div>
          <span className="recipe-count">{state.data.length} recipes</span>
        </div>

        <div className="meal-grid">
          {state.data.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      </section>
    </>
  );
}

export default Meal;
