import React from "react";

export default function ToDo({ todo }) {
  return (
    <>
      <li>
        <input type="checkbox" checked={todo.completed} />
        {todo.name}
      </li>
    </>
  );
}
