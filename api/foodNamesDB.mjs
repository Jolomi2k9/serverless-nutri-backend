import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

// Instantiate the DynamoDB Document Client
const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

async function fetchFoodNames() {
  const params = {
    TableName: process.env.PRODUCE_TABLE,
    ProjectionExpression: "foodName",
  };

  try {
    // Use ScanCommand with ddbDocClient
    const data = await ddbDocClient.send(new ScanCommand(params));
    return data.Items.map(item => item.foodName); // Return an array of food names
  } catch (error) {
    console.error("Error fetching food names:", error);
    throw new Error("Failed to fetch food names");
  }
}

export { fetchFoodNames };

