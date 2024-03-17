import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customAxios from '../utils/axios';

const initialState = {
  restaurants: [],
  loading: false,
  error: '',
};

export const fetchRestaurants = createAsyncThunk(
  'restaurants/fetchRestaurants',
  async (_, { rejectWithValue }) => {
    try {
      const response = await customAxios.get('/api/restaurants/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const restaurantSlice = createSlice({
  name: 'restaurants',
  initialState,
  reducers: {
    setRestaurants: (state, action) => {
      state.restaurants = action.payload;
    },
    resetRestaurants: (state) => {
      state.restaurants = initialState.restaurants;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.loading = false;
        state.restaurants = action.payload.results;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch restaurants';
      });
  },
}).reducer;
