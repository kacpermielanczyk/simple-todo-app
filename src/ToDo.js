import React from "react";
import { motion } from "framer-motion";

export default function ToDo({ todo, deleteToDo, changeStyle, moveToTrash }) {
  const textTodoStyle = "lead d-inline-block text-break";
  const listStyle =
    "list-group-item d-flex justify-content-between align-items-center";

  function handlerDeleteClick() {
    deleteToDo(todo.id);
  }

  function handlerChangeStyle() {
    changeStyle(todo.id);
  }

  function handlerToTrash() {
    moveToTrash(todo.id);
  }

  return (
    <>
      <motion.li
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={
          todo.complete === true
            ? `${listStyle} bg-light done-todo`
            : `${listStyle} todo`
        }
      >
        <div className="d-flex justify-content-center align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            checked={todo.complete}
            onChange={handlerChangeStyle}
          />
        </div>
        <div className="ms-2 me-auto">
          <div
            className={
              todo.complete === true
                ? `text-muted text-decoration-line-through ${textTodoStyle}`
                : `text-decoration-none ${textTodoStyle}`
            }
          >
            { todo.name }
          </div>
          <br />
          <span className="small">
            {todo.dataDone !== null
              ? `Finished: ${todo.dataDone}`
              : `Create: ${todo.dataCreate}`}
          </span>
        </div>
        
        { todo.isTrash === true && <button className="btn btn-primary m-1" onClick={handlerToTrash}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bootstrap-reboot"
            viewBox="0 0 16 16"
          >
            <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
            <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
          </svg>
        </button>}
        
        <button onClick={ todo.isTrash === true ? handlerDeleteClick : handlerToTrash } className="btn btn-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-trash3"
            viewBox="0 0 16 16"
          >
            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
          </svg>
        </button>
      </motion.li>
    </>
  );
}
