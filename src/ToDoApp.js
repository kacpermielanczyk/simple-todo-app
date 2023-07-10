import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";
import { motion } from "framer-motion";

import ToDoList from "./ToDoList";
import HeaderToDoApp from "./headerToDoApp";
import FinishedTodoHeader from "./FinishedTodoHeader";
import Menu from "./Menu";

const LOCAL_STORAGE_TODOS = "todos";

export default function ToDoApp() {
  const [todos, setToDos] = useState([]);
  const [toggle, setToggle] = useState(1);
  const todoName = useRef();

  // change tab
  function updateToggle(id) {
    setToggle(id);
  }

  // load from localstorage
  useEffect(() => {
    const storedToDos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_TODOS));
    if (storedToDos) setToDos(storedToDos);
  }, []);

  // save todo
  function AddToDo() {
    const name = todoName.current.value;
    const dateFormat = new Date();
    const dataCreateTodo = format(dateFormat, "yyyy-MM-dd HH:mm");

    if (name === "") return null;

    const todo = {
      id: uuidv4(),
      name: name,
      complete: false,
      isTrash: false,
      dataCreate: dataCreateTodo,
      dataDone: null,
    };
    setToDos((prevToDos) => {
      return [...prevToDos, todo];
    });
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify([...todos, todo]));
    todoName.current.value = null;
  }

  // save in key down
  function handleKeyDown(event) {
    if (event.key === "Enter") {
      AddToDo();
    }
  }

  // move to trash
  function moveToTrash(id) {
    let newTodoList = [...todos];
    for(let i = 0; i < newTodoList.length; i++) {
      if(newTodoList[i].id === id) {
        newTodoList[i].isTrash = !newTodoList[i].isTrash;
        break;
      }
    }
    setToDos(newTodoList);
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(newTodoList));
  }

  // delete todo
  function deleteToDo(id) {
    let newTodoList = todos.filter((todo) => {
      return todo.id !== id;
    });
    setToDos(newTodoList);
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(newTodoList));
  }

  // change style and parameters todo
  function changeStyle(id) {
    let newTodoList = [...todos];
    for (let i = 0; i < todos.length; i++) {
      if (newTodoList[i].id === id) {
        newTodoList[i].complete = !newTodoList[i].complete;
        if (newTodoList[i].dataDone === null) {
          const dateFormat = new Date();
          const dataDoneTodo = format(dateFormat, "yyyy-MM-dd HH:mm");
          newTodoList[i].dataDone = dataDoneTodo;
        } else {
          newTodoList[i].dataDone = null;
        }
        break;
      }
    }
    localStorage.setItem(LOCAL_STORAGE_TODOS, JSON.stringify(newTodoList));
    setToDos(newTodoList);
  }

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="container word-wrap text-wrap"
    >
      <HeaderToDoApp />

      <Menu toggle={toggle} updateToggle={updateToggle} />

      <motion.div
        animate={toggle === 1 ? { opacity: 1, y:0 } : { opacity: 0, y:5 }}
        initial={toggle === 1 ? { opacity: 0, y: 5 } : { opacity: 1, y:0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className={toggle === 1 ? "show-content" : "content"}
      >
        <div className="input-group mb-3">
          <button
            className="btn btn-primary input-group-text test-button"
            onClick={AddToDo}
          >
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

        {todos.every((todo) => todo.complete !== false) && (
          <p className="h5 text-center">No tasks yet</p>
        )}
        <ToDoList
          todos={todos.filter((todo) => {
            return (todo.complete === false) && (todo.isTrash === false);
          })}
          deleteToDo={deleteToDo}
          changeStyle={changeStyle}
          moveToTrash={moveToTrash}
        />
      </motion.div>

      <motion.div
        animate={toggle === 2 ? { opacity: 1, y:0 } : { opacity: 0, y:5 }}
        initial={toggle === 2 ? { opacity: 0, y: 5 } : { opacity: 1, y:0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={toggle === 2 ? "show-content" : "content"}
      >
        <FinishedTodoHeader todos={todos} />
        <ToDoList
          todos={todos.filter((todo) => {
            return (todo.complete === true) && (todo.isTrash === false);
          })}
          deleteToDo={deleteToDo}
          changeStyle={changeStyle}
          moveToTrash={moveToTrash}
        />
      </motion.div>

      <motion.div
        animate={toggle === 3 ? { opacity: 1, y:0 } : { opacity: 0, y:5 }}
        initial={toggle === 3 ? { opacity: 0, y: 5 } : { opacity: 1, y:0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={toggle === 3 ? "show-content" : "content"}
      >
        <ToDoList
          todos={todos.filter((todo) => {
            return todo.isTrash === true;
          })}
          deleteToDo={deleteToDo}
          changeStyle={changeStyle}
          moveToTrash={moveToTrash}
        />
      </motion.div>
    </motion.div>
  );
}