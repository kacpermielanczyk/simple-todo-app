import { React, useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";

const LOCAL_STORAGE_TODOS = "todos";

export default function ToDoApp() {
  const [todos, setToDos] = useState([]);

  const todoName = useRef();

  // load from localstorage
  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    if (storedToDos) setToDos(storedToDos);
    console.log(todos)
  }, []);

  // save to localstorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
  }, [todos]);

  // save todo array
  function AddToDo(event) {
    let name = todoName.current.value;

    if (name === "") return null;

    setToDos((prevToDos) => {
      return [
        ...prevToDos,
        { id: crypto.randomUUID(), name: name, complete: false },
      ];
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
