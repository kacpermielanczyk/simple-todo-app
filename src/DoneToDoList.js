import React, {useState} from 'react'
import ToDo from './ToDo'

export default function DoneToDoList({ todos, deleteToDo, changeStyle }) {


  return (
    <div>
        
      <h2 className='text-center mt-5 mb-2 font-weight-bold display-1'>Done todo</h2>
      {todos !== 0 ? <p>tasks have not been completed yet</p> : null}
      <ul className="list-group">
        {todos.map((todo) => {
            return <ToDo key={todo.id} todo={todo} deleteToDo={deleteToDo} changeStyle={changeStyle}/>
        })}
      </ul>
    </div>
  )
}
