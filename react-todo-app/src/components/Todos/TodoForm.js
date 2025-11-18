import React, { useState } from 'react'
import axios from 'axios';

export default function TodoForm({ todos, setTodos }) {

    const initialState = {
        id: '',
        message: ''
    }

    const [todo, setTodo] = useState(initialState)

    const handleChange = e => {
        setTodo({
            ...todo,
            message: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        if (!todo.message.trim()) return;

        setTodos([ 
            { ...todo, id: Date.now() }, 
            ...todos 
        ])
        setTodo(initialState)
        axios.post('http://localhost:8888/todos', { ...todo, id: Date.now() })
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="todo"
                    value={todo.message}
                    placeholder="Enter your Todo item"
                    onChange={handleChange}
                />
                <button type="submit">Add Todo</button>
            </form>
        </div>
    )
}