import React from "react";
import Delete from "./Delete";
import { Link } from "react-router-dom";

const Cards = ({ data, error, setData }) => {
  return (
    <div className="row g-3">
      {error && <p className="text-danger text-center w-100">{error}</p>}

      {data?.map((ele) => (
        <div key={ele._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
          <div className="card h-100">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{ele.username}</h5>

              <h6 className="card-subtitle mb-2 text-body-secondary">
                {ele.email}
              </h6>

              <h6 className="card-subtitle mb-2 text-body-secondary">
                {ele.age}
              </h6>

              <div className="mt-auto d-flex gap-2">
                <Delete setData={setData} id={ele._id} data={data} />
                <Link className="btn btn-primary" to={`/${ele._id}`}>
                  Edit
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
