import type { NextRequest } from "next/server";
import client from "@/lib/mongodb";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const database = client.db("cron");
  const collection = database.collection("tasks");
  const doc = { timestamp: new Date().toISOString() };
  const { insertedId } = await collection.insertOne(doc);
  const createdDoc = await collection.findOne({ _id: insertedId });

  revalidatePath("/");
  return Response.json(createdDoc);
}
