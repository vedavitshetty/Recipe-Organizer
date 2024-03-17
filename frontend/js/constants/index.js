// Function to parse ingredients string into an array
export const parseIngredients = (ingredientsString) => {
  try {
    return JSON.parse(ingredientsString.replace(/'/g, '"'));
  } catch (error) {
    console.error('Error parsing ingredients:', error);
    return [];
  }
};
