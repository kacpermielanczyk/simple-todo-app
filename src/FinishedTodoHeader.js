import React from "react";

export default function FinishedTodoHeader({ todos }) {
  return (
    <>
      <h2 className="text-center mb-2 display-4">
        Finished todo
      </h2>
      {todos.every((todo) => todo.complete !== true) ? (
        <p className="h5 text-center">tasks have not been completed yet</p>
      ) : null}
    </>
  );
}
