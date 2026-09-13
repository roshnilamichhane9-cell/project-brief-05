import React from "react";

const Card = ({ title, value, children }) => {
  return (
    <div className="card">

      {title && (
        <h3>{title}</h3>
      )}

      {value !== undefined && (
        <div className="stat-value">
          {value}
        </div>
      )}

      {children}

    </div>
  );
};

export default Card;