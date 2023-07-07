import React from "react";
import ToDo from "./ToDo";

export default function DoneToDoList({ todos, deleteToDo, changeStyle }) {
  return (
    <div>
      
      <ul className="list-group">
        {todos.map((todo) => {
          return (
            <ToDo
              key={todo.id}
              todo={todo}
              deleteToDo={deleteToDo}
              changeStyle={changeStyle}
            />
          );
        })}
      </ul>
    </div>
  );
}