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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
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
        "http://localhost:8080/api/v1/user/register",
        form
      );

      if (response.data.success) {
        toast.success(response.data.message || "Registration Successful! 🎉");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Something went wrong! ❌");
      }
    } catch (error) {
      console.error(error);

      // Display backend error message if available
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred! ❌");
      }
    }
  };

  return (
    <div className="h-[90vh] flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Register Yourself
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action="" onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  value={form.username}
                  onChange={formHandler}
                  type="text"
                  placeholder="Enter your username"
                />
              </div>
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
          <p className="">Already registered?</p>
          <Link className="text-blue-600 underline" to="/login">
            Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
