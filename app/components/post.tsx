import client from "@/lib/mongodb";

type Props = {
  id: string;
};

export default async function Post({ id }: Props) {
  console.log(id);
  const post = await client
    .db("reddit-tools")
    .collection("listings")
    .find({ name: id })
    .toArray();

  console.log(post);
  return (
    <div>
      <h1>Post</h1>
      <p>Post id: {id}</p>
    </div>
  );
}
