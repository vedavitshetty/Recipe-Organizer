import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../store/recipeSlice';
import { parseIngredients } from '../constants';
import LogoutButton from '../components/LogoutButton';

const ViewRecipe = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeSlice.currentRecipe);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  return (
    <div>
      <h2>Recipe Details</h2>
      <LogoutButton />
      {recipe ? (
        <div>
          <h3>{recipe.title}</h3>
          <p>Ingredients:</p>
          <ul>
            {parseIngredients(recipe.ingredients).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>Instructions:</p>
          <p>{recipe.instructions}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewRecipe;
