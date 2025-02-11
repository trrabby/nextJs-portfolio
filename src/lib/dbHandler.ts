/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// Higher-order function to handle database operations
export async function dbHandler(operation: any, collection: string) {
  try {
    const client = await clientPromise;
    const db = client.db("Protfolio"); // Replace with your database name

    const result = await operation(db.collection(collection));

    return NextResponse.json(result);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Unable to connect to database" },
      { status: 500 }
    );
  }
}
