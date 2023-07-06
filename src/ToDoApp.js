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
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    if (storedToDos) setToDos(storedToDos);
  }, []);

  // save todo
  function AddToDo() {
    const name = todoName.current.value;
    if (name === "") return null;

    const todo = {
        id: uuidv4(), name: name, complete: false
    };
    setToDos((prevToDos) => {
      return [...prevToDos, todo];
    });

    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify([...todos, todo]));
    todoName.current.value = null;
  }

  // save in key down
  function handleKeyDown(event) {
    if (event.key === 'Enter') {
        AddToDo();
    }
  }

  // delete todo
  function deleteToDo(id) {
    let newTodoList = todos.filter(todo => {
        return todo.id !== id
    });
    setToDos(newTodoList);
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(newTodoList));
  }

  // change style and statement todo
  function changeStyle(id) {
    let newTodoList = [...todos];
    for(let i = 0; i < todos.length; i++) {
        if(newTodoList[i].id === id) {
            newTodoList[i].complete = !newTodoList[i].complete;
            break;
        }
    }
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(newTodoList));
    setToDos(newTodoList);
  }

  return (
    <div className="container word-wrap text-wrap">
      <HeaderToDoApp />
      <div className="input-group mb-3">
        <button className="btn btn-primary input-group-text test-button" onClick={AddToDo}>
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
          onKeyDown={handleKeyDown}
        />
      </div>

      {todos.length === 0 && <p className="h5 text-center">No quests yet</p>}
      <ToDoList todos={todos} deleteToDo={deleteToDo} changeStyle={changeStyle} />
    </div>
  );
}