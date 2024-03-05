
/**
 * Route: GET /food/n/{id}
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";
import * as util from "./util.mjs";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.PRODUCE_TABLE;

export const handler = async (event) => {
  try {
    const foodName = decodeURIComponent(event.pathParameters.foodName);

    const params = {
      TableName: tableName,
      IndexName: 'FoodNameIndex', 
      KeyConditionExpression: "foodName = :fn",
      ExpressionAttributeValues: {
        ":fn": foodName,
      },
    };

    const queryCmd = new QueryCommand(params);
    const { Items } = await ddbDocClient.send(queryCmd);

    if (Items.length > 0) {
      return {
        statusCode: 200,
        headers: util.getResponseHeaders(),
        body: JSON.stringify(Items),
      };
    } else {
      return {
        statusCode: 404,
        headers: util.getResponseHeaders(),
        body: JSON.stringify({ message: "Item not found" }),
      };
    }
  } catch (err) {
    console.error(`Error occurred: ${JSON.stringify(err, null, 2)}`);

    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
};




