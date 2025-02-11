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
    "Projects" // The name of the collection
  );
}

// post project
export async function POST(request: Request) {
  return dbHandler(async (collection: any) => {
    const newProject = await request.json();
    return await collection.insertOne(newProject);
  }, "Projects");
}
