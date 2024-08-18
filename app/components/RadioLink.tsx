"use client";

import { useRouter } from "next/navigation";

type Props = {
  id: string;
  name: string;
};

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value);
};

export default function RadioLink({ id, name }: Props) {
  const router = useRouter();

  return (
    <input
      id={id}
      type="radio"
      name={name}
      value={id}
      // onChange={() => router.push(`/content/${id}`)}
      className="appearance-none  outline-none"
    />
  );
}
