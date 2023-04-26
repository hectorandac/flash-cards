import React from "react";
import "./Counter.css";

const Counter = ({ masteredCount, totalCount }) => {
  return (
    <div className="counter">
      <span>{masteredCount}</span> / <span>{totalCount}</span>
    </div>
  );
};

export default Counter;
