import { React, useState, useRef } from "react";
import ToDoList from "./ToDoList";

export default function ToDoApp() {
  const [todos, setToDos] = useState([]);

  const todoName = useRef();

  function AddToDo(event) {
    let name = todoName.current.value;

    if (name === "") return null;

    setToDos((prevToDos) => {
      return [...prevToDos, { id: name, name: name, complete: false }];
    });

    todoName.current.value = null;
  }

  return (
    <>
      <input ref={todoName} type="text" />
      <button onClick={AddToDo}>Add</button>
      <ToDoList todos={todos} />
    </>
  );
}
