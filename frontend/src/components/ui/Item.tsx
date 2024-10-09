function Item({ name, id }: { name?: string; id: string }) {
  return (
    <div className="flex  w-full gap-4 items-center hover:bg-slate-400 p-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2.0"
        stroke="currentColor"
        className="size-6 "
      >
        <path stroke-linecap="round" stroke-linejoin="round" d={id} />
      </svg>

      <p className="text-xl font-semibold">{name}</p>
    </div>
  );
}

export default Item;
