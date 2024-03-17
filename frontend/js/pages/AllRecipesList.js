import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRecipes } from '../store/recipeSlice';

const AllRecipesList = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeSlice.allRecipes);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  // Function to parse ingredients string into an array
  const parseIngredients = (ingredientsString) => {
    try {
      return JSON.parse(ingredientsString.replace(/'/g, '"'));
    } catch (error) {
      console.error('Error parsing ingredients:', error);
      return [];
    }
  };

  return (
    <div>
      <h2>All Recipes</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
          </tr>
        </thead>
        <tbody>
          {recipes.map(recipe => (
            <tr key={recipe.id}>
              <td>{recipe.title}</td>
              <td>
                <ul>
                  {parseIngredients(recipe.ingredients).map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRecipesList;
