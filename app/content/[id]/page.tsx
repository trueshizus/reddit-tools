import Post from "@/app/components/Post";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <Post id={id} />;
}
