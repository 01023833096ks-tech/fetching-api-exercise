function mealCard({ meal }) {
  return (
    <article className="meal-card">
      <div className="image-wrap">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <span className="tag">Seafood</span>
      </div>
      <div className="card-content">
        <h3>{meal.strMeal}</h3>
        <span className="arrow" aria-hidden="true">
          ↗
        </span>
      </div>
    </article>
  );
}

export default mealCard;
