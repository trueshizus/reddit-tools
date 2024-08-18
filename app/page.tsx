import client from "@/lib/mongodb";
import PostSummary from "./components/PostSummary";
import Queue from "./components/Queue";

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
    <main className="grid grid-cols-3 w-screen h-screen border border-solid bg-zinc-950/5 border-zinc-950 has-[:focus]:border-4">
      <aside className="border border-solid bg-zinc-950/5 border-zinc-950 has-[:focus]:border-4 p-2 grid overflow-hidden">
        <Queue name="new" items={listing} component={PostSummary} />
      </aside>
      <section className="col-span-2">content</section>
    </main>
  );
}
