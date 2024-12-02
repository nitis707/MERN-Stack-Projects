// DeleteButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Delete = ({ id, data, setData }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      // Filter out the deleted item from the data state
      const updatedData = data.filter((ele) => ele._id !== id);
      setData(updatedData);

      setTimeout(() => {
        navigate("/all"); // Redirect to /all path after deletion
      }, 1000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault(); // Prevent page reload
          handleDelete();
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default Delete;
