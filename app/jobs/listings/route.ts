import type { NextRequest } from "next/server";
import client from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import redditApiClient from "@/lib/reddit-api-client";
import { after } from "node:test";

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  }
  const database = client.db("reddit-tools");
  const cronCollection = database.collection("jobs");
  const listingCollection = database.collection("listings");

  // get last cron doc and store after value
  const lastCronDoc = await cronCollection
    .find({})
    .sort({ timestamp: -1 })
    .limit(1)
    .toArray();

  const after = lastCronDoc.length ? lastCronDoc[0].after : null;

  const response = await redditApiClient
    .subreddit("argentina")
    .listing("new", after);

  if (!response.data.children.length) {
    return new Response("No new posts", { status: 204 });
  }

  const cronDoc = {
    timestamp: new Date().toISOString(),
    after: response.data.after,
  };

  const listings = response.data.children.map((child: any) => ({
    ...child,
    kind: child.kind,
    _id: child.data.name,
  }));

  await listingCollection.insertMany(listings);

  const { insertedId } = await cronCollection.insertOne(cronDoc);
  const createdCronDoc = await cronCollection.findOne({ _id: insertedId });

  revalidatePath("/");
  return Response.json(createdCronDoc);
}
