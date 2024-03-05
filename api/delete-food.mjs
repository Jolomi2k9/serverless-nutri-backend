/**
 * Route: DELETE /food/{id}
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";
import * as util from "./util.mjs";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.PRODUCE_TABLE;

export const handler = async (event) => {
  try {
    // Use the 'id' from path parameters directly
    const id = event.pathParameters.id;

    const params = {
      TableName: tableName,
      Key: {
        id: id, 
      },
    };

    const deleteCmd = new DeleteCommand(params);
    await ddbDocClient.send(deleteCmd); 

    console.log(`Item with ID ${id} deleted successfully.`);

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({ message: `Item with ID ${id} deleted successfully.` }),
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
