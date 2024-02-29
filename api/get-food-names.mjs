import { fetchFoodNames } from './foodNamesDB.mjs';

exports.handler = async (event) => {
  try {
    const foodNames = await fetchFoodNames();
    return { statusCode: 200, body: JSON.stringify(foodNames) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};

