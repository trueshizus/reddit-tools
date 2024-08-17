type Props = {
  _id: string;
  author: string;
  body: string;
};

export default function Comment({ author, body }: Props) {
  return (
    <div>
      <p>{body}</p>
    </div>
  );
}
