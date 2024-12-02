import React from "react";

const Button = ({ name }) => {
  return (
    <div>
      <button type="submit" className="btn btn-primary">
        {name}
      </button>
    </div>
  );
};

export default Button;
