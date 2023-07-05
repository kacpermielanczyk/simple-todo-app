import React from "react";

export default function ToDo({ todo }) {
  return (
    <>
      <li className="list-group-item">
        {todo.name}
      </li>
    </>
  );
}