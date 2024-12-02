import React, { useState } from "react";
import Message from "./Message";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleInput = (e) => {
    setFormData((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "An error occurred. Please try again.");
        setSuccess("");
      } else {
        setSuccess("User added successfully!");
        setError("");
        setFormData({
          username: "",
          email: "",
          age: 0,
        });

        // Redirect to Read component after successful data submission
        setTimeout(() => {
          navigate("/all"); // Redirect to /read path
        }, 1000); // Wait for 1 seconds to show success message
      }
    } catch (error) {
      setError("Error submitting form. Please try again.");
      setSuccess("");
      // console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-6 offset-3">
          <h2 className="text-center">Enter the data!</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="exampleInputName" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="username"
                className="form-control"
                id="exampleInputName"
                value={formData.username}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputEmail" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail"
                value={formData.email}
                onChange={handleInput}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="exampleInputAge" className="form-label">
                Age
              </label>
              <input
                type="number"
                name="age"
                className="form-control"
                id="exampleInputAge"
                value={formData.age}
                onChange={handleInput}
              />
            </div>

            <Button name="Submit" />
          </form>

          <Message message={error} type="error" />
          <Message message={success} type="success" />
        </div>
      </div>
    </div>
  );
};

export default Create;
