import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./ToDoList";
import HeaderToDoApp from "./headerToDoApp";

const LOCAL_STORAGE_TODOS = "todos";

export default function ToDoApp() {
  const [todos, setToDos] = useState([]);
  const todoName = useRef();

  // load from localstorage
  useEffect(() => {
    console.log("useEffect1");
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    if (storedToDos) setToDos(storedToDos);
    console.log(storedToDos);
  }, []);

  // save to localstorage
  useEffect(() => {
    console.log("useEffect2");
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(todos));
  }, [todos]);

  // save todo array
  function AddToDo() {
    let name = todoName.current.value;
    if (name === "") return null;

    setToDos((prevToDos) => {
      return [...prevToDos, { id: uuidv4(), name: name, complete: false }];
    });
    todoName.current.value = null;
  }

  return (
    <div className="container word-wrap text-wrap">
      <HeaderToDoApp />
      <div className="input-group mb-3">
        <button className="input-group-text" onClick={AddToDo}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
        </button>
        <input
          ref={todoName}
          type="text"
          className="form-control form-control-lg"
          placeholder="Add yours task"
          aria-describedby="basic-addon1"
        />
      </div>

      {todos.length === 0 && <p className="h5 text-center">No quests yet</p>}
      <ToDoList todos={todos} />
    </div>
  );
}
