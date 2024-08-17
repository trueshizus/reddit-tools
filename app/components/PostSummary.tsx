type Props = {
  _id: string;
  data: {
    title: string;
    link_flair_text: string;
    author: string;
  };
};

export default function PostSummary({ data }: Props) {
  const { title, link_flair_text, author } = data;
  return (
    <article>
      <h2>{title}</h2>
      <span>{author}</span>
      <span>{link_flair_text}</span>
    </article>
  );
}
