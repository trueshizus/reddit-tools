import client from "@/lib/mongodb";
import Queue from "../components/Queue";
import PostSummary from "../components/PostSummary";
import Comment from "../components/Comment";

export default async function Page() {
  const modqueue = client.db("reddit-tools").collection("modqueue");

  const comments = await modqueue.find({ kind: "t1" }).toArray();
  const posts = await modqueue.find({ kind: "t3" }).toArray();

  return (
    <div>
      <h1>ModQueue</h1>
      <main className="grid grid-cols-2">
        <Queue name="posts" items={posts} component={PostSummary} />
        <Queue name="comments" items={comments} component={Comment} />
      </main>
    </div>
  );
}
