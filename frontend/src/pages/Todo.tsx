const Todo = ({
  title,
  description,
  created_At,
}: {
  title: string;
  description: string;
  created_At: string;
}) => {
  return (
    <div className="w-[300px] h-44 border border-slate-200  shadow-lg p-4">
      <div>
        {" "}
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>{created_At}</div>
    </div>
  );
};

export default Todo;
