import client from "../lib/mongodb";

type Task = {
  timestamp: string;
};

export default async function Home() {
  const tasks = await client
    .db("cron")
    .collection<Task>("tasks")
    .find({})
    .limit(1)
    .toArray();

  return (
    <main>
      <h1>Reddit Tools</h1>
      <p>Last task: {tasks[0] ? JSON.stringify(tasks[0]) : "No tasks found"}</p>
    </main>
  );
}
