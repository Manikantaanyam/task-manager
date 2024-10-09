import Modal from "@/components/ui/Modal";
import { useRecoilValue } from "recoil";
import { dataAtom } from "@/store/atoms/dataAtom";
import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import Todo from "@/components/ui/Todo";
import TodoForm1 from "@/components/ui/TodoForm1";
import { useFetch } from "@/hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "@/components/ui/session";

const Dashboard1 = () => {
  const data = useRecoilValue(dataAtom);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { fetchData } = useFetch();

  const handleTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault;
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/todo`,
        { title, description: desc },
        {
          headers: {
            Authorization: `Bearer ${getToken("token")}`,
          },
        }
      );
      toast.success("created a todo");
      fetchData();
    } catch (e) {
      toast.error("Error while creating todo");
    }
  };

  const toggleTodoForm = () => {
    setShowTodoForm(!showTodoForm);
  };

  return (
    <div className="flex h-screen">
      <div>
        <Sidebar />
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
            <TodoForm1
              onChange1={(e) => setDesc(e.target.value)}
              onChange={(e) => setTitle(e.target.value)}
              onClick={handleTodo}
              buttonType="create"
            />
          </Modal>
        )}
        <div className="grid grid-cols-3 gap-4 h-[calc(100%-70px)] overflow-scroll">
          {data.length > 0 ? (
            data.map((i) => (
              <Todo
                id={i.id}
                title={i.title}
                description={i.description}
                created_At={i.created_At}
              />
            ))
          ) : (
            <button className="flex justify-center items-center w-full ml-80 -mt-10">
              You have no notes
            </button>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Dashboard1;
