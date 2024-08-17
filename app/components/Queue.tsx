type Props = {
  name: string;
  items: Array<any>;
  component: (props: any) => JSX.Element;
};

export default function Queue({ name, items, component }: Props) {
  return (
    <fieldset>
      <legend>{name}</legend>

      {items.map((item: any) => (
        <div key={item._id} className="has-[:checked]:bg-indigo-50">
          <input
            key={item._id}
            type="radio"
            className="appearance-none"
            id={item._id}
            name={name}
            value={item._id}
          />

          {component({ ...item })}
        </div>
      ))}
    </fieldset>
  );
}
