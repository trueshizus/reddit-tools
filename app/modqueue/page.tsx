import client from "@/lib/mongodb";

export default async function Page() {
  const modqueue = client.db("reddit-tools").collection("modqueue");

  const comments = await modqueue.find({ kind: "t1" }).toArray();
  const posts = await modqueue.find({ kind: "t3" }).toArray();

  return (
    <div>
      <h1>ModQueue</h1>
      <main className="grid grid-cols-2">
        <section>
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post._id.toString()}>{post.title}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>Comments</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment._id.toString()}>{comment.body}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
