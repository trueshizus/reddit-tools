export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return (
    <div>
      <span>Content id {id} </span>
    </div>
  );
}
