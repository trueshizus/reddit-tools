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
  const listingsJob = await database.collection("jobs").findOne({ 'listings' });
  const listingCollection = database.collection("listings");
  
  const lastLog = listingsJob?.logs?.latest;
  const after = lastLog?.after || null;

  const response = await redditApiClient
    .subreddit("argentina")
    .listing("new", after);

  if (!response.data.children.length) {
    return new Response("No new posts", { status: 204 });
  }

  const logEntry = {
    status: 'success',
    after: response.data.after || after,
    timestamp: new Date().toISOString(),
  };

    const updateDoc = {
    $set: {
      after: response.data.after || after,  // Update 'after' value in the main document
      "logs.latest": logEntry,  // Store the latest log entry in a nested document
    },
    $push: {
      "logs.history": logEntry,  // Append the log entry to the history subdocument
    },
  };

    if (!jobDoc) {
    await cronCollection.insertOne({
      jobType,
      after: response.data.after || null,
      logs: {
        latest: logEntry,
        history: [logEntry],
      },
    });
  } else {
    await cronCollection.updateOne({ jobType }, updateDoc);
  }

  const listings = response.data.children.map((child: any) => ({
    ...child,
    _id: child.data.name,
  }));

  await listingCollection.insertMany(listings);

  const { insertedId } = await cronCollection.insertOne(cronDoc);
  const createdCronDoc = await cronCollection.findOne({ _id: insertedId });

  revalidatePath("/");
    const updatedJobDoc = await cronCollection.findOne({ jobType });
  return Response.json(updatedJobDoc);
}
