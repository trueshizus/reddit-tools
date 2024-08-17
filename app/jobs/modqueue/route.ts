import client from "@/lib/mongodb";
import redditApiClient from "@/lib/reddit-api-client";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  }
  let after = null;
  let count = 0;
  const database = client.db("reddit-tools");
  const modqueueCollection = database.collection("modqueue");

  do {
    const modqueueResponse = await redditApiClient
      .subreddit("argentina")
      .modqueue(after);

    after = modqueueResponse.data.after;

    const moderationItems = modqueueResponse.data.children.map(
      ({ kind, data }: any) => ({
        ...data,
        kind,
        _timestamp: new Date().toISOString(),
        _id: data.name,
      })
    );

    const bulkOps = moderationItems.map((item: any) => ({
      updateOne: {
        filter: { _id: item._id },
        update: { $setOnInsert: item },
        upsert: true,
      },
    }));

    const result = await modqueueCollection.bulkWrite(bulkOps);

    if (result.matchedCount > 0) {
      after = null;
    }

    count += result.upsertedCount;
  } while (after);

  return Response.json({ status: "ok", count });
}
