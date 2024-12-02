import React from "react";

const Message = ({ message, type }) => {
  if (!message) return null; // Don't render if no message

  return (
    <p className={`mt-3 ${type === "error" ? "text-danger" : "text-success"}`}>
      {message}
    </p>
  );
};

export default Message;
