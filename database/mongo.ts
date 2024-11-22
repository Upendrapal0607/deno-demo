import { MongoClient } from "../deps.ts";
const client = new MongoClient();
let connection = await client.connect("mongodb://127.0.0.1:27017");
export const db = client.database("deno_api");
export const Connection = async (): Promise<void> => {
  if (!connection) {
    console.error("Failed to connect to MongoDB!");
  } else {
    console.log("Connected to MongoDB!");
  }
};
