import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="flex flex-col py-8 lg:py-0 px-4 lg:px-0 lg:flex-row justify-between items-center gap-8 h-[90vh]">
      <div className="w-full">
        <h1 className="flex flex-col text-5xl font-semibold">
          <span className="text-gray-700">Organize work and life</span>
          <span className="text-red-500">finally.</span>
        </h1>
        <p className="my-7">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam
          animi quos accusantium quae ducimus unde, earum mollitia, distinctio
          repudiandae reprehenderit veritatis minus nisi sed maxime, dolorem
          nostrum! Quibusdam quod quis tenetur.
        </p>
        <div className="space-x-4">
          <Link to="/register" className="">
            <Button variant="destructive">Register Now!</Button>
          </Link>
          <Link to="/login" className="">
            <Button className="bg-blue-700 hover:bg-blue-900">Login</Button>
          </Link>
        </div>
      </div>

      <div className="w-full">
        <img src="./todo-img.jpg" width={"100%"} height={515} alt="" />
      </div>
    </div>
  );
};

export default Landing;
