import axios from "axios";
import Dashboard from "./Dashboard";
import Todo from "./Todo";
import { BACKEND_URL } from "@/config";
import { useEffect, useState } from "react";

const Dashboard1 = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function hanldeData() {
      const response = await axios.get(`${BACKEND_URL}/api/v1/todo/bulk`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      setData(response.data);
    }

    hanldeData();
  }, []);

  return (
    <div className="flex h-screen">
      <div>
        <Dashboard />
      </div>
      <div className="w-full p-4 gap-3">
        <div className="grid grid-cols-3 gap-4">
          {data.map((i) => (
            <Todo
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
