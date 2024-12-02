import React, { useEffect, useState } from "react";
import Cards from "./Cards";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  // Fetch all data from the backend
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8080");
      const result = await response.json();

      if (response.ok) {
        setData(result); // Update state with fetched data
      } else {
        setError(result.error || "No data found!.");
      }
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center">All Data</h2>
      <Cards data={data} setData={setData} error={error} />
    </div>
  );
};

export default Read;
