import React from 'react'

export default function HeaderTrashTodo({ todos }) {
    return (
    <div>
      <h2 className="text-center mb-2 display-4">
        Delete todo
      </h2>

      {todos.every(todo => todo.isTrash === false) ? <p className="h5 text-center">there are no todos in the trash can</p> : null}
    </div>
  )
}