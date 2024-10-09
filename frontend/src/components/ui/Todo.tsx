import { BACKEND_URL } from "@/config";
import axios from "axios";
import { useState } from "react";
import Modal from "./Modal";
import TodoForm1 from "./TodoForm1";
import { useFetch } from "@/hooks/useFetch";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "./session";

const Todo = ({
  id,
  title,
  description,
  created_At,
}: {
  id: string;
  title: string;
  description: string;
  created_At: string;
}) => {
  const [titlee, setTitle] = useState("");
  const [descriptionn, setDescriptionn] = useState("");
  const { fetchData } = useFetch();

  const handleDelete = async (id?: string) => {
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/todo/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken("token")}`,
        },
      });
      toast.success("Deleted");

      fetchData();
    } catch (e) {
      toast.error("Not deleted");
    }
  };

  const handleUpdate = async (id?: string) => {
    try {
      await axios.put(
        `${BACKEND_URL}/api/v1/todo/${id}`,
        { title: titlee, description: descriptionn },
        {
          headers: {
            Authorization: `Bearer ${getToken("token")}`,
          },
        }
      );
      fetchData();
      toast.success("updated");
    } catch (e) {
      toast.error("Not updated");
    }
  };

  const [showTodoForm, setShowTodoForm] = useState(false);
  const toggleTodoForm = () => {
    if (!showTodoForm) {
      setTitle(title);
      setDescriptionn(description);
    }
    setShowTodoForm(!showTodoForm);
  };

  return (
    <div className="w-[300px] relative h-44 border border-slate-200  shadow-lg p-4">
      <div className="flex flex-col gap-2">
        <h3 className="text-md font-semibold">{title}</h3>
        <p className="text-sm font-light text-slate-900">
          {description?.slice(0, 30)}
        </p>
      </div>
      <div className="text-sm flex justify-between w-full absolute bottom-5">
        <h3> {new Date(created_At ? created_At : "").toLocaleString()}</h3>
        <div className="flex mr-10 gap-2">
          <svg
            onClick={toggleTodoForm}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5 cursor-pointer  hover:text-red-900"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
          <svg
            onClick={() => {
              handleDelete(id);
            }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5 cursor-pointer hover:text-red-900"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
          {showTodoForm && (
            <Modal onClose={toggleTodoForm}>
              <TodoForm1
                onClick={() => {
                  handleUpdate(id);
                }}
                onChange={(e) => setTitle(e.target.value)}
                onChange1={(e) => setDescriptionn(e.target.value)}
                buttonType="Update"
                title1={titlee}
                description1={descriptionn}
              />
            </Modal>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Todo;
