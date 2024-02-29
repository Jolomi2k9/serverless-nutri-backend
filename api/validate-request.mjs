
import { fetchFoodNames } from './foodNamesDB.mjs';
const didyoumean = require('didyoumean2').default;

exports.handler = async (event) => {
    try {
        const allFoodNames = await fetchFoodNames();
        const inputFoodName = event.foodName; 

        // String Validation
        if (typeof inputFoodName !== 'string') {
            return { valid: false, error: 'Input must be a string' };
        }

        // Similarity Check & Normalization
        const maybeYouMeant = didyoumean(inputFoodName, allFoodNames);

        if (maybeYouMeant) {
            // Return corrected name
            return { valid: true, sanitizedInput: maybeYouMeant }; 
        } else if (allFoodNames.includes(inputFoodName.toUpperCase())) { // Additional check 
            return { valid: true, sanitizedInput: inputFoodName.toUpperCase() }; // case normalization
        } else {
            return { valid: false, error: 'Food item not found' };
        }
    } catch (error) {
        console.error("Error in validation:", error);
        return { valid: false, error: error.message };
    }
};


  