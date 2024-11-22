import { db } from "../database/mongo.ts";
import { ObjectId } from "../deps.ts";
const dataCollection = db.collection("deno_data");
export const getData = async ({ response }: { response: any }) => {
  const users = await dataCollection.find({}).toArray();
  response.body = users;
};

export const createData = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body().value;
  const id = await dataCollection.insertOne(body);
  response.body = { message: "User created", id };
  response.status = 201;
};
export const deleteData = async (context: any) => {
  try {
    const { params, response } = context;
    const { id } = params;
    console.log(id);
    const result = await dataCollection.deleteOne({ _id: new ObjectId(id) });
    console.log({ result });
    if (result === 1) {
      response.body = { message: "User deleted", id };
      response.status = 200;
    } else {
      response.body = { message: "User not found" };
      response.status = 404;
    }
  } catch (error) {
    console.log({
      error,
    });
  }
};

export const updateData = async (context: any) => {
  const { params, request, response } = context;
  const { id } = params;

  const body = await request.body().value;

  try {
    const result = await dataCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.modifiedCount === 1) {
      response.body = { message: "User updated", id };
      response.status = 200;
    } else {
      response.body = { message: "User not found or no changes made" };
      response.status = 404;
    }
  } catch (error) {
    response.body = { message: "Error updating user", error: error.message };
    response.status = 500;
  }
};
