import client from "@/lib/mongodb";
import Queue from "../components/Queue";
import PostSummary from "../components/PostSummary";
import Comment from "../components/Comment";

export default async function Page() {
  const modqueue = client.db("reddit-tools").collection("modqueue");

  const comments = await modqueue.find({ kind: "t1" }).toArray();
  const posts = await modqueue.find({ kind: "t3" }).toArray();

  return (
    <main className="grid grid-cols-3 w-screen h-screen border border-solid bg-zinc-950/10 border-zinc-950 has-[:focus]:border-4">
      <Queue name="posts" items={posts} component={PostSummary} />
      <Queue name="comments" items={comments} component={Comment} />
    </main>
  );
}
