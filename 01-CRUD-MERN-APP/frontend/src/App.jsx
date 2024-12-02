import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./components/Create";
import Read from "./components/Read";
import Update from "./components/Update";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/all" element={<Read />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
