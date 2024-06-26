/**
 * Route: PATCH /food
 */


import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import * as util from "./util.mjs";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.PRODUCE_TABLE;

export const handler = async (event) => {
  const { id } = event.pathParameters; // Extracting the item id from the path
  const updateData = JSON.parse(event.body); 

  let updateExpression = "set";
  let expressionAttributeNames = {};
  let expressionAttributeValues = {};
  for (const property in updateData) {
    updateExpression += ` #${property} = :${property},`;
    expressionAttributeNames[`#${property}`] = property;
    expressionAttributeValues[`:${property}`] = updateData[property];
  }
  updateExpression = updateExpression.slice(0, -1); // Remove the trailing comma

  try {
    const updateCmd = new UpdateCommand({
      TableName: tableName,
      Key: { id }, // Use id as the primary key 
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "UPDATED_NEW",
    });

    const data = await docClient.send(updateCmd);
    console.log(`UpdateCommand response: ${JSON.stringify(data, null, 2)}`);

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify(data.Attributes),
    };
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


