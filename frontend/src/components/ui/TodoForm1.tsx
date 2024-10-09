const TodoForm1 = ({
  title1,
  description1,
  buttonType,
  onClick,
  onChange,
  onChange1,
}: {
  title1?: string;
  description1?: string;
  buttonType: string;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange1: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex h-screen flex-col justify-center">
        <div className="w-[400px] h-[250px] p-4 border border-gray-300 shadow-md">
          <h1 className="text-xl font-bold text-center">
            {buttonType === "create" ? "Add" : "Update"} a todo
          </h1>
          <div className="flex flex-col mt-4 gap-6">
            <input
              value={title1}
              onChange={onChange}
              type="text"
              className="border rounded-full p-2 pl-4 border-gray-300"
              placeholder="title"
            />
            <input
              onChange={onChange1}
              value={description1}
              type="text"
              className="border rounded-full p-2 pl-4 border-gray-300"
              placeholder="decription..."
            />
          </div>
          <button
            onClick={onClick}
            className="py-2 w-full font-bold text-white bg-green-600 rounded-md mt-4"
          >
            {buttonType}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm1;
