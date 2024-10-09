import Modal from "@/components/ui/Modal";
import { useRecoilState } from "recoil";
import { dataAtom } from "@/store/atoms/dataAtom";
import { useEffect, useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import axios from "axios";
import { BACKEND_URL } from "@/config";
import Todo from "@/components/ui/Todo";
import TodoForm1 from "@/components/ui/TodoForm1";
const Dashboard1 = () => {
  const [data, setData] = useRecoilState(dataAtom);
  const [showTodoForm, setShowTodoForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/todo/bulk`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

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
            <TodoForm1 />
          </Modal>
        )}
        <div className="grid grid-cols-3 gap-4 h-[calc(100%-70px)] overflow-scroll">
          {data.length > 0
            ? data.map((i) => (
                <Todo
                  id={i.id}
                  title={i.title}
                  description={i.description}
                  created_At={i.created_At}
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Dashboard1;
