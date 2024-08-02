import type { NextRequest } from "next/server";
import client from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  await client
    .db("cron")
    .collection("tasks")
    .insertOne({ timestampt: new Date() });
  return Response.json({ success: true });
}
