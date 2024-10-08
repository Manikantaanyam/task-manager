import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useState } from "react";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleTodo = async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/todo`,
      { title, description: desc },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );

    console.log(response.data);
  };
  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex h-screen flex-col justify-center">
        <div className="w-[400px] h-[250px] p-4 border border-gray-300 shadow-md">
          <h1 className="text-xl font-bold text-center">Add a todo</h1>
          <div className="flex flex-col mt-4 gap-6">
            <input
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="border rounded-full p-2 pl-4 border-gray-300"
              placeholder="title"
            />
            <input
              onChange={(e) => setDesc(e.target.value)}
              type="text"
              className="border rounded-full p-2 pl-4 border-gray-300"
              placeholder="decription..."
            />
          </div>
          <button
            onClick={handleTodo}
            className="py-2 w-full font-bold bg-green-600 rounded-md mt-4"
          >
            create now
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoForm;
