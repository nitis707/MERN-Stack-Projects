import { Button } from "@/components/ui/button";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import About from "./pages/about/About";
import TodoList from "./pages/todos/TodoList";
import HomePage from "./pages/home/HomePage";

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/todoList" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
