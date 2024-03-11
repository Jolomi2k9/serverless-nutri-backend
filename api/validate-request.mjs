
import { fetchFoodNames } from './foodNamesDB.mjs';
const didyoumean = require('didyoumean2').default;

exports.handler = async (event) => {
  try {
    // Fetch food names pre-processed as uppercase for efficiency
    let allFoodNames = await fetchFoodNames();
    allFoodNames = allFoodNames.map(name => name.toUpperCase());

    const inputFoodName = event.foodName; 

    // String Validation
    if (typeof inputFoodName !== 'string') {
      return { valid: false, error: 'Food name must be a string' }; 
    }

    const normalizedInputFoodName = inputFoodName.toUpperCase();

    // Similarity Check with threshold
    const maybeYouMeant = didyoumean(normalizedInputFoodName, allFoodNames, { 
      caseSensitive: false, 
      threshold: 0.7 // Adjust as needed
    });

    if (maybeYouMeant) {
      return { valid: true, sanitizedInput: maybeYouMeant };
    } else if (allFoodNames.includes(normalizedInputFoodName)) {
      return { valid: true, sanitizedInput: normalizedInputFoodName };
    } else {
      return { valid: false, error: 'Food item not found' };
    }

  } catch (error) {
    console.error("Error in validation:", error);
    return { 
      valid: false, 
      error: error.message || 'An error occurred during validation' 
    };
  }
};



  