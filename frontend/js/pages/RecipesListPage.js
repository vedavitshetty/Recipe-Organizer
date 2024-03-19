import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToRestaurant, fetchOtherRecipes, removeFromRestaurant } from '../store/recipeSlice';
import LogoutButton from '../components/LogoutButton';
import { parseIngredients } from '../constants';

const RecipesListPage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeSlice.recipes);
  const [showRestaurantRecipes, setShowRestaurantRecipes] = useState(false);

  useEffect(() => {
    if (showRestaurantRecipes) {
      dispatch(fetchRestaurantRecipes());
    } else {
      dispatch(fetchOtherRecipes());
    }
  }, [dispatch, showRestaurantRecipes]);

  const toggleRestaurantRecipes = () => {
    setShowRestaurantRecipes((prev) => !prev);
  };

  return (
    <div>
      <h2>{showRestaurantRecipes ? 'Restaurant' : 'Non-Restaurant'} Recipes</h2>
      <LogoutButton />
      <button onClick={toggleRestaurantRecipes}>
        {showRestaurantRecipes ? 'Show Non-Restaurant Recipes' : 'Show Restaurant Recipes'}
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Ingredients</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {recipes?.map((recipe) => (
            <tr key={recipe.id}>
              <td>
                <Link to={`/recipes/${recipe.id}`}>{recipe.title}</Link>
              </td>
              <td>
                <ul>
                  {parseIngredients(recipe.ingredients)?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </td>
              <td>
                {showRestaurantRecipes ? (
                  <button onClick={() => dispatch(removeFromRestaurant(recipe.id))}>Remove</button>
                ) : (
                  <button onClick={() => dispatch(addToRestaurant(recipe.id))}>Add</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecipesListPage;
