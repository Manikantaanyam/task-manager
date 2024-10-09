import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthForm } from "./pages/AuthForm";
import Dashboard1 from "./pages/Dashboard1";
import { useFetch } from "./hooks/useFetch";
import { useEffect } from "react";
import Protected from "./components/ui/Protected";

function App() {
  const { fetchData } = useFetch();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthForm type="signup" />} />
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route
            path="/dashboard"
            element={
              <Protected>
                <Dashboard1 />
              </Protected>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
