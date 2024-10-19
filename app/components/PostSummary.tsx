import { formatDate } from "@/lib/helpers";

type Props = {
  _id: string;
  title: string;
  link_flair_text: string;
  author: string;
  created_utc: number;
};

export default function PostSummary({
  title,
  link_flair_text,
  author,
  created_utc,
}: Props) {
  return (
    <article>
      <section className="text-sm flex justify-between">
        <span className="italic bg-zinc-950/5">By {author}</span>
        {/* <span>{link_flair_text}</span> */}
        <time className="">{formatDate(new Date(created_utc * 1000))}</time>
      </section>
      <h2>{title}</h2>
    </article>
  );
}
