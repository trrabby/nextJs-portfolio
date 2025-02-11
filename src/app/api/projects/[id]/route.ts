/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbHandler } from "@/lib/dbHandler";
import { ObjectId } from "mongodb";

// get sigle item
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  console.log(params);
  return dbHandler(async (collection: any) => {
    const project = await collection.findOne({
      _id: new ObjectId(params.id),
    });
    return project;
  }, "Projects");
}

// update project
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  return dbHandler(async (collection: any) => {
    const { title, description } = await request.json(); // Example fields
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { title, description } } // Update fields here
    );
    return result;
  }, "Projects");
}

// update project
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  return dbHandler(async (collection: any) => {
    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) }, // Match the project by its ID
      { $set: { isDeleted: true } }, // Update fields here (use $set to define fields to update)
      { upsert: true }
    );
    return result;
  }, "Projects");
}
