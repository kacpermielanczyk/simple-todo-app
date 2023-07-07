import React from "react";

export default function Menu({ toggle, updateToggle}) {
    
  return (
    <div>
      <ul className="nav nav-pills mb-5 justify-content-center">
        <li className="nav-item">
          <button
            type="button"
            onClick={() => updateToggle(1)}
            className={
              toggle === 1
                ? "nav-link btn active m-1"
                : "btn btn-outline-primary m-1"
            }
          >
            Todo
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            onClick={() => updateToggle(2)}
            className={
              toggle === 2
                ? "nav-link btn active m-1"
                : "btn btn-outline-primary m-1"
            }
          >
            Finished todo
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            onClick={() => updateToggle(3)}
            className={
              toggle === 3
                ? "nav-link btn active m-1"
                : "btn btn-outline-primary m-1"
            }
          >
            All delete todo
          </button>
        </li>
      </ul>
    </div>
  );
}