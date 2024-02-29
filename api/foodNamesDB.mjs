const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

async function fetchFoodNames() {
  const params = {
    TableName: process.env.PRODUCE_TABLE,
    ProjectionExpression: "foodName",
  };

  try {
    const data = await dynamoDB.scan(params).promise();
    return data.Items.map(item => item.foodName); // Return an  array of food names 
  } catch (error) {
    console.error("Error fetching food names:", error);
    throw new Error("Failed to fetch food names");
  }
}

export { fetchFoodNames };
