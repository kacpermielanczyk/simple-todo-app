import React from "react";

export default function FinishedTodoHeader({ todos }) {
  return (
    <div>
      <h2 className="text-center mt-5 mb-2 font-weight-bold display-4">
        Done todo
      </h2>
      {todos.every((todo) => todo.complete !== true) ? (
        <p className="h5 text-center">tasks have not been completed yet</p>
      ) : null}
    </div>
  );
}
