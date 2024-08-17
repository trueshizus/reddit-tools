type Props = {
  _id: string;
  title: string;
  link_flair_text: string;
  author: string;
};

export default function PostSummary({ title, link_flair_text, author }: Props) {
  return (
    <article>
      <h2>{title}</h2>
      <span>{author}</span>
      <span>{link_flair_text}</span>
    </article>
  );
}
