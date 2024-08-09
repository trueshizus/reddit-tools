import client from "@/lib/mongodb";
import redditApiClient from "@/lib/reddit-api-client";
import Post from "./components/post";

type Task = {
  timestamp: string;
};

export default async function Home() {
  const tasks = await client
    .db("cron")
    .collection<Task>("tasks")
    .find({})
    .sort({ timestamp: -1 })
    .limit(1)
    .toArray();

  const response = await redditApiClient.subreddit("argentina").listing("new");

  console.log(response.data.children[0].data);

  return (
    <main className="bg-slate-500">
      <h1>Reddit Tools</h1>
      <div className="flex">
        <aside className="flex flex-col gap-4">
          {response.data.children.map((post: any) => (
            <Post post={post} key={post.data.id} />
          ))}
        </aside>
        <section>content</section>
      </div>
    </main>
  );
}
