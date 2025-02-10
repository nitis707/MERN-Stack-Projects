import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Navbar from "@/components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Navbar />
      <App />
      <Toaster position="top-center" reverseOrder={false} />
    </StrictMode>
  </BrowserRouter>
);
