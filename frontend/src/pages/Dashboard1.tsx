import axios from "axios";
import Dashboard from "./Dashboard";
import Todo from "./Todo";
import Modal from "./Modal";
import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import { useRecoilValue } from "recoil";
import { dataAtom } from "@/store/atoms/dataAtom";

const Dashboard1 = () => {
  const data = useRecoilValue(dataAtom);
  const [showTodoForm, setShowTodoForm] = useState(false);

  const toggleTodoForm = () => {
    setShowTodoForm(!showTodoForm); // Toggle the visibility of TodoForm
  };

  return (
    <div className="flex h-screen">
      <div>
        <Dashboard />
      </div>
      <div className="w-full p-4 gap-3">
        <div className="w-full flex justify-between mb-8">
          <h1 className="text-2xl font-bold pl-4">Tasks</h1>
          <button
            onClick={toggleTodoForm}
            className="bg-green-700 mr-10 rounded-md font-bold text-white py-1.5 px-4"
          >
            create
          </button>
        </div>
        {showTodoForm && (
          <Modal onClose={toggleTodoForm}>
            <TodoForm onClose={toggleTodoForm} />
          </Modal>
        )}
        <div className="grid grid-cols-3 gap-4 h-[calc(100%-70px)] overflow-scroll">
          {data.map((i) => (
            <Todo
              id={i.id}
              title={i.title}
              description={i.description}
              created_At={i.created_At}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
