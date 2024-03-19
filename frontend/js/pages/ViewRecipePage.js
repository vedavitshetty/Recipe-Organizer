import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRecipeById } from '../store/recipeSlice';
import { parseIngredients } from '../constants';
import LogoutButton from '../components/LogoutButton';
import NotFoundPage from './NotFoundPage'; // Import NotFoundPage component

const ViewRecipePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipeSlice.currentRecipe);
  const loading = useSelector((state) => state.recipeSlice.loading);

  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [dispatch, id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!recipe) {
    return <NotFoundPage />;
  }

  if (Object.keys(recipe).length === 0) {
    return <NotFoundPage />;
  }

  return (
    <div className='mt-3'>
      <LogoutButton />
      <h2>Recipe Details</h2>
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
    </div>
  );
};

export default ViewRecipePage;
