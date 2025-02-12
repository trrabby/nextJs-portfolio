/* eslint-disable @typescript-eslint/no-explicit-any */
import { dbHandler } from "@/lib/dbHandler";

// get all projects
export async function GET(request: Request) {
  const user = request.json();
  console.log(user);

  return dbHandler(
    async (collection: any) => {
      return await collection.find({}).toArray();
    },
    "User" // The name of the collection
  );
}
