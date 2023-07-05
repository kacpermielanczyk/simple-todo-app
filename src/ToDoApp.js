import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import ToDoList from "./ToDoList";

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
    <div className="container-sm">
    <div className="input-group mb-3">
        <button className="input-group-text" onClick={AddToDo}>Add</button>
        <input ref={todoName} type="text" className="form-control" placeholder="Add yours todo" aria-label="Username" aria-describedby="basic-addon1"/>
    </div>

      
      <ToDoList todos={todos} />
    </div>
  );
}