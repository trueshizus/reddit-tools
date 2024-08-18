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
              className="grid grid-cols-12 gap-4 border border-solid bg-zinc-950/20 border-zinc-950 has-[:focus]:border-x-4 p-2"
              className="grid grid-cols-12 gap-4 border border-solid border-zinc-950 has-[:focus]:bg-zinc-950/5 has-[:focus]:border-x-2 p-2"
            >
              <input
                key={item._id}
                type="radio"
                // className="appearance-none"
                className="aspect-square accent-zinc-500 focus:accent-zinc-950 outline-none"
                id={item._id}
                name={name}
                value={item._id}
              />
              <div className="col-span-11">{component({ ...item })}</div>
            </label>
          </div>
        ))}
      </section>
    </fieldset>
  );
}
