/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbHandler } from "@/lib/dbHandler";

// get all projects
export async function GET() {
  return dbHandler(
    async (collection: any) => {
      return await collection
        .find({
          $or: [
            { isDeleted: { $ne: true } },
            { isDeleted: { $exists: false } },
          ],
        })
        .toArray();
    },
    "User" // The name of the collection
  );
}

// post user
export async function POST(request: Request) {
  return dbHandler(async (collection: any) => {
    const newUser = await request.json();
    const result = await collection.insertOne(newUser);

    // let accessToken
    // if(result.insertedId){
    //     accessToken=
    // }
    return result;
  }, "User");
}
