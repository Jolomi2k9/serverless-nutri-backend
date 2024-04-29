
import { fetchFoodNames } from './foodNamesDB.mjs';
const didyoumean = require('didyoumean2').default;

exports.handler = async (event) => {
  try {
    // Fetch food names as uppercase 
    let allFoodNames = await fetchFoodNames();
    allFoodNames = allFoodNames.map(name => name.toUpperCase());

    const inputFoodName = event.foodName; 

    // String Validation
    if (typeof inputFoodName !== 'string') {
      return { valid: false, error: 'Food name must be a string' }; 
    }

    const normalizedInputFoodName = inputFoodName.toUpperCase();

    // Similarity Check 
    const maybeYouMeant = didyoumean(normalizedInputFoodName, allFoodNames, { 
      caseSensitive: false, 
      threshold: 0.7 
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
      error: error.message || 'error during validation' 
    };
  }
};



  