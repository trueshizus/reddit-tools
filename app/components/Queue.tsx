import RadioLink from "./RadioLink";

type Props = {
  name: string;
  items: Array<any>;
  component: (props: any) => JSX.Element;
};

export default function Queue({ name, items, component }: Props) {
  return (
    <fieldset className="border border-solid bg-zinc-950/5 border-zinc-950 has-[:focus]:border-4 p-2 flex overflow-hidden">
      <legend className="bg-zinc-950 min-w-16 text-center text-white mx-auto">
        {name}
      </legend>

      <section className="border border-solid bg-zinc-950/5 border-zinc-950 has-[:focus]:border-4 overflow-auto scrollbar">
        {items.map((item: any) => (
          <div key={item._id}>
            <label
              htmlFor={item._id}
              className="border border-solid border-zinc-950 has-[:checked]:bg-zinc-950/5 has-[:checked]:border-l-8 p-2 flex flex-col"
            >
              <RadioLink id={item._id} name={name} />
              <div>{component({ ...item })}</div>
            </label>
          </div>
        ))}
      </section>
    </fieldset>
  );
}
