import client from "@/lib/mongodb";
import redditApiClient from "@/lib/reddit-api-client";
import Post from "./components/post";

type Job = {
  after: string;
  timestamp: string;
};

export default async function Home() {
  const listing = await client
    .db("reddit-tools")
    .collection("listings")
    .find({})
    .toArray();

  return (
    <main className="bg-slate-500">
      <div className="flex">
        <aside className="flex flex-col gap-2 bg-slate-600 px-6">
          {listing.map((post: any) => (
            <Post post={post} key={post.data.id} />
          ))}
        </aside>
        <section>content</section>
      </div>
    </main>
  );
}
