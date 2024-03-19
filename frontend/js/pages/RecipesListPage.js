import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToRestaurant, fetchOtherRecipes, fetchRestaurantRecipes, removeFromRestaurant } from '../store/recipeSlice';
import LogoutButton from '../components/LogoutButton';
import { parseIngredients } from '../constants';
import '../../sass/pages/RecipesListPage.scss';

const RecipesListPage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipeSlice.recipes);
  const [showRestaurantRecipes, setShowRestaurantRecipes] = useState(true);

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
    <div className="recipes-list-container">
      <LogoutButton />
      <h2>{showRestaurantRecipes ? 'Restaurant' : 'Non-Restaurant'} Recipes</h2>
      <button onClick={toggleRestaurantRecipes} className="toggle-button">
        {showRestaurantRecipes ? 'Show Non-Restaurant Recipes' : 'Show Restaurant Recipes'}
      </button>
      <table className="recipes-table">
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
                  <button onClick={() => dispatch(removeFromRestaurant(recipe.id))} className="remove-button">Remove</button>
                ) : (
                  <button onClick={() => dispatch(addToRestaurant(recipe.id))} className="add-button">Add</button>
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
