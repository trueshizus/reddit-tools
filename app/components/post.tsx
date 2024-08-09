"use client";

import { approvePost, removePost } from "../actions";

type Props = {
  post: any;
};

export default function Post({ post }: Props) {
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key === "a") {
      approvePost(post.data.name);
    }

    if (event.key === "d") {
      removePost(post.data.name);
    }
  };

  return (
    <label
      key={post.data.id}
      htmlFor={post.data.id}
      className="block w-full max-w-lg px-10 py-8 bg-white rounded-lg shadow-xl has-[:checked]:bg-indigo-50 mt-9"
    >
      <div className="flex">
        <input
          type="radio"
          name="listing-new"
          value={post.data.id}
          onKeyDown={handleKeyDown}
          id={post.data.id}
        />
        <div>
          <h2 className="text-xl font-bold">{post.data.title}</h2>
          <small>{post.data.author}</small>
          <p>{post.data.selftext}</p>
        </div>
      </div>
    </label>
  );
}
