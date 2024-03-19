// recipeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../utils/axios';

const initialState = {
  recipes: [],
  currentRecipe: {},
  loading: false,
  error: '',
};

export const fetchOtherRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customAxios.get('/api/recipes/show_non_restaurant_recipes/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRestaurantRecipes = createAsyncThunk(
  'recipes/fetchRestaurantRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customAxios.get('/api/recipes/show_restaurant_recipes/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addToRestaurant = createAsyncThunk(
  'user/addToRestaurant',
  async (recipeId, { dispatch, rejectWithValue }) => {
    try {
      const response = await customAxios.post(`/api/recipes/add_to_restaurant/${recipeId}/`);
      dispatch(fetchOtherRecipes());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFromRestaurant = createAsyncThunk(
  'user/removeFromRestaurant',
  async (recipeId, {dispatch, rejectWithValue }) => {
    try {
      const response = await customAxios.post(`/api/recipes/remove_from_restaurant/${recipeId}/`);
      dispatch(fetchRestaurantRecipes());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await customAxios.get(`/api/recipes/${recipeId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes: (state, action) => {
      state.recipes = action.payload;
    },
    resetRecipes: (state) => {
      state.recipes = initialState.recipes;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherRecipes.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchOtherRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload; // Change this line
      })
      .addCase(fetchOtherRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch recipes';
      })
      .addCase(fetchRestaurantRecipes.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRestaurantRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.recipes = action.payload;
      })
      .addCase(fetchRestaurantRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch recipes';
      })
      .addCase(fetchRecipeById.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentRecipe = action.payload;
      })
      .addCase(fetchRecipeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch recipe';
      })
      .addCase(addToRestaurant.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addToRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        alert('Recipe added to restaurant');
      })
      .addCase(addToRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to add recipe to restaurant';
      })
      .addCase(removeFromRestaurant.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(removeFromRestaurant.fulfilled, (state, action) => {
        state.loading = false;
        alert('Recipe removed from restaurant');
      })
      .addCase(removeFromRestaurant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to remove recipe from restaurant';
      });
  },
}).reducer;
