import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { AuthForm } from "./pages/AuthForm";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<AuthForm type="signup" />} />
          <Route path="/login" element={<AuthForm type="login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
