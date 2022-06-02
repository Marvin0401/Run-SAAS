import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <div>
        <h1>Not Found!</h1>
      </div>
      <div>
        <Link to="/cms/pages">
          <button>Back To Home</button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
