import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get the stored login data from localStorage
    const storedData = JSON.parse(localStorage.getItem("todo-app"));

    if (storedData) {
      setSession(storedData);
    }
  }, []);

  const handleLogout = () => {
    // Clear the user data from localStorage and update session state
    localStorage.removeItem("todo-app");
    setSession(null);
  };

  return (
    <>
      <nav className="bg-black text-white">
        <div className="container mx-auto px-4 lg:px-0 flex justify-between items-center">
          <span>Todo List</span>
          <ul className="flex items-center gap-4 h-14">
            <Link to={`/home`}>
              <li>Home</li>
            </Link>
            <Link to="/todoList">
              <li>Todos</li>
            </Link>
            <Link to="/about">
              <li>About</li>
            </Link>

            {session ? (
              <Button onClick={handleLogout} variant="destructive">
                Logout
              </Button>
            ) : (
              <Link to="/login">
                <Button variant="secondary">Login</Button>
              </Link>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
