import client from "@/lib/mongodb";
import Queue from "./Queue";
import PostSummary from "./PostSummary";

export default async function Sidebar() {
  const listing = await client
    .db("reddit-tools")
    .collection("listings")
    .find({})
    .sort({ created_utc: -1 })
    .toArray();
  return <Queue name="new" items={listing} component={PostSummary} />;
}
