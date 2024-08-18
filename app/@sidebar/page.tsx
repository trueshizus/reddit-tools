import client from "@/lib/mongodb";
import Queue from "../components/Queue";
import PostSummary from "../components/PostSummary";

export default async function Sidebar() {
  const listing = await client
    .db("reddit-tools")
    .collection("listings")
    .find({})
    .toArray();
  return <Queue name="new" items={listing} component={PostSummary} />;
}
