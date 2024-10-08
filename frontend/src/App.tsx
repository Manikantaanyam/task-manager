import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthForm } from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";
import Dashboard1 from "./pages/Dashboard1";
import TodoForm from "./pages/TodoForm";
import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { useRecoilState } from "recoil";
import { dataAtom } from "./store/atoms/dataAtom";
function App() {
  const [data, setData] = useRecoilState(dataAtom);
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AuthForm type="signup" />} />
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/dashboard" element={<Dashboard1 />} />
          <Route path="/todo" element={<TodoForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
