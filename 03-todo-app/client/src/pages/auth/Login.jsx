import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { CircleUserRound } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/user/login",
        form
      );

      if (response.data.success) {
        toast.success(response.data.message || "Login Successful! 🎉");

        localStorage.setItem("todo-app", JSON.stringify(response.data));

        navigate("/");
      } else {
        toast.error(response.data.message || "Something went wrong! ❌");
      }
    } catch (error) {
      console.log(error);

      if (error.response) {
        // ✅ Show backend error message
        toast.error(
          error.response.data.message || "Invalid Email or Password!"
        );
      } else {
        // ✅ Handle server errors
        toast.error("Server error! Please try again later.");
      }
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex justify-center">
            <CircleUserRound size={150} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={formHandler}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  value={form.password}
                  onChange={formHandler}
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <Button type="submit">Login</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="space-x-1">
          <p>Not a user?</p>
          <Link className="text-blue-600 underline" to="/register">
            Register
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
