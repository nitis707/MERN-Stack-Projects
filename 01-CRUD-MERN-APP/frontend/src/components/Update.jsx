import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";

const Update = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    age: 0,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const handleInput = (e) => {
    setFormData((currData) => ({
      ...currData,
      [e.target.name]: e.target.value,
    }));
  };

  const getSingleUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Error fetching user data.");
      } else {
        setError("");
        setFormData(result);
      }
    } catch (error) {
      setError("Error fetching user data.");
    }
  };

  const handleUpdates = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: "PUT",
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
        setSuccess("User Updated successfully!");
        setError("");

        // Redirect after a short delay to show success (optional)
        setTimeout(() => {
          navigate("/all"); // Navigate to the desired route after successful update
        }, 1000);
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      setSuccess("");
    }
  };

  useEffect(() => {
    getSingleUser();
  }, [id]);

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-6 offset-3">
          <h2 className="text-center">Edit the data!</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleUpdates}>
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

            <Button name="Save Changes" />
          </form>

          <Message message={error} type="error" />
          <Message message={success} type="success" />
        </div>
      </div>
    </div>
  );
};

export default Update;
