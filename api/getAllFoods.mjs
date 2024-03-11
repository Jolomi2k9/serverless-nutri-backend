/**
 * Route: GET /food/n/{food}
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import * as util from "./util.mjs";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.PRODUCE_TABLE;

export const handler = async () => {
  try {
    const scanParams = {
      TableName: tableName,
    };

    const { Items } = await docClient.send(new ScanCommand(scanParams));

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify(Items),
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
