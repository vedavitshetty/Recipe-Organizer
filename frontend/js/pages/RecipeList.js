import React, { useEffect, useState } from 'react';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);

  /* TODO: Fetch recipes from the API
  useEffect(() => {
    fetch('/api/recipes/')
      .then(response => response.json())
      .then(data => setRecipes(data));
  }, []);*/

  return (
    <div>
      {//TODO: Render recipes here
      }
      {
      /*recipes.map(recipe => (
        <div key={recipe.id}>Hello</div>
      ))*/}
    </div>
  );
};

export default RecipeList;
