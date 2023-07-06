import React from "react";
import ToDo from "./ToDo";

export default function ToDoList({ todos, deleteToDo }) {
  return (
    <ul className="list-group">
      {todos.map((todo) => {
        return <ToDo key={todo.id} todo={todo} deleteToDo={deleteToDo} />;
      })}
    </ul>
  );
}