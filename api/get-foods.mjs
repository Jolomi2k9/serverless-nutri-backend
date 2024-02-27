/**
 * Route: GET /foods
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import * as util from "./util.mjs";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.PRODUCE_TABLE;

export const handler = async (event) => {
  try {
    const query = event.queryStringParameters;
    const limit = query && query.limit ? parseInt(query.limit, 10) : 5; // Set a default limit to prevent fetching too much data

    const params = {
      TableName: tableName,
      Limit: limit,
    };

    // If there's a need to start from a specific item (pagination), use ExclusiveStartKey
    if (query && query.startKey) {
      params.ExclusiveStartKey = {
        id: query.startKey, // Assuming 'id' is your primary key; adjust if your table uses a different key
      };
    }

    const scanCmd = new ScanCommand(params);
    const data = await ddbDocClient.send(scanCmd);
    console.log(`ScanCommand response: ${JSON.stringify(data, null, 2)}`);

    return {
      statusCode: 200,
      headers: util.getResponseHeaders(),
      body: JSON.stringify({
        items: data.Items,
        count: data.Count,
        scannedCount: data.ScannedCount,
        lastEvaluatedKey: data.LastEvaluatedKey, // Use this for pagination
      }),
    };
  } catch (err) {
    console.error(`Error occurred: ${err}`);

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
