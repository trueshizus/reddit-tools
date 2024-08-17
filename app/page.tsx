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
    <main className="bg-slate-500 grid grid-cols-3">
      <aside className="flex flex-col gap-4 bg-slate-600 px-6 pt-4">
        <Queue name="new" items={listing} component={PostSummary} />
      </aside>
      <section className="col-span-2">content</section>
    </main>
  );
}
