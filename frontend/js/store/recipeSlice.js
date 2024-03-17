import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../utils/axios';

const initialState = {
  allRecipes: [],
  loading: false,
  error: '',
};

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customAxios.get('/api/recipes/');
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
      state.allRecipes = action.payload;
    },
    resetRecipes: (state) => {
      state.allRecipes = initialState.allRecipes;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.allRecipes = action.payload.results;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch recipes';
      });
  },
}).reducer;

