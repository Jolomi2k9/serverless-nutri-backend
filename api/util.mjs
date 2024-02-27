export const getId = (headers) => {
    return headers.app_id;
  };
  
export const getFoodName = (headers) => {
  return headers.app_food_name;
};

export const getCategory = (headers) => {
  return headers.app_category;
};
  
export const getResponseHeaders = () => {
  return {
    "Access-Control-Allow-Origin": "*",
  };
};