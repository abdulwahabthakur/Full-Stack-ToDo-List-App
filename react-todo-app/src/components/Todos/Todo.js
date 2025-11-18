import React, { useState } from 'react'

export default function Todo({ todo, deleteHandler, updateHandler }) {

    const [isEditing, setIsEditing] = useState(false)
    const [updatedTodo, setUpdatedTodo] = useState(todo)

    const updatedTodoState = e => {
        setUpdatedTodo({
            id: todo.id,
            message: e.target.value
        })
    }

    const updateAndReset = (e) => {
        e.preventDefault()
        updateHandler(updatedTodo)
        setIsEditing(false)
    }

    return (
        <div>
            {isEditing ?
                <form onSubmit={updateAndReset}>
                    
                    <input
                        type="text"
                        value={updatedTodo.message} 
                        onChange={updatedTodoState}
                    />
                </form>
                :
                <p onDoubleClick={() => setIsEditing(true)}>{todo.message}</p>
            }
            <button onClick={() => deleteHandler(todo.id)}>X</button>
        </div>
    )
}