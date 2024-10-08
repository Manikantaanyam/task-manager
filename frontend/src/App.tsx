import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthForm } from "./pages/AuthForm";
import Dashboard from "./pages/Dashboard";
import Dashboard1 from "./pages/Dashboard1";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AuthForm type="signup" />} />
          <Route path="/login" element={<AuthForm type="login" />} />
          <Route path="/dashboard" element={<Dashboard1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
